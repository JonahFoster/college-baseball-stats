import pandas as pd
from collegebaseball import ncaa_scraper
from collegebaseball import lookup
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

load_dotenv()

db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_pass = os.getenv("DB_PASS")
db_name = os.getenv("DB_NAME")

engine = create_engine(f"mysql+pymysql://{db_user}:{db_pass}@{db_host}/{db_name}")

team_ids = [2,721,5,8,6,7,9,14,17,27,29,28,31,30,32,2678,725,37,43,47,51,14927,61,62,66,67,71,72,77,80,81,83,86,87,94,90,97,101,107,30135,115,116,1004,127,128,129,48,136,140,147,149,1014,158,164,165,167,169,1045,172,173,175,180,178,30095,193,196,198,201,202,204,1068,219,220,222,235,228,229,28755,231,234,236,96,244,1092,248,249,251,257,253,254,255,260,261,1104,272,275,277,19651,283,285,288,287,301,299,302,2743,306,305,310,312,314,316,315,317,328,327,1157,331,334,340,342,346,352,355,28600,99,361,363,365,366,498,367,370,380,381,386,388,392,391,393,400,368,402,404,406,415,414,418,416,419,428,433,430,432,434,669,439,444,450,454,726,463,464,466,465,471,473,472,474,477,482,483,485,487,457,488,489,490,456,458,459,460,494,493,2711,500,502,503,505,509,508,513,514,519,518,522,521,523,527,529,528,534,539,540,541,545,551,553,1320,554,559,562,563,572,574,575,576,587,102,590,624,625,627,626,629,630,631,632,1356,635,639,646,648,10411,649,651,654,655,665,657,659,660,664,610,596,603,606,609,617,674,676,678,683,1395,690,694,692,695,703,697,26172,698,699,670,700,702,536,706,141,709,711,716,718,108,109,111,104,110,732,30024,741,735,736,739,746,740,742,748,749,756,754,768,769,771,772,774,782,786,792,797,2915,810,812,813,817,52,112,308,410,671]

print(pd.__version__)

#def get_data(data_type):
#    all_data = pd.DataFrame()
#    for team_id in team_ids:
#        df = ncaa_scraper.ncaa_team_totals(team_id, 2023, data_type, include_advanced=True)
#        if df.empty:
#            continue
#        school_name = lookup.lookup_school_reverse(team_id)
#        df['school_name'] = f"{school_name[0]} {data_type}"
#        df = df[~df.apply(lambda row: 'Opponent Totals' in row.values, axis=1)]
#        all_data = all_data.append(df, ignore_index=True)
#    all_data.to_sql(f'collegebaseball_{data_type}', engine, if_exists='replace', index=False)
#    print(data_type + " Complete")



def get_player_data(data_type):
    # Try reading existing data from database, if it doesn't exist, initialize an empty DataFrame
    try:
        all_data = pd.read_sql('SELECT * FROM collegebaseballplayer_unified', engine)
    except:
        all_data = pd.DataFrame()

    for year in range(2014, 2024):  # This will loop through years 2014 to 2023
        for team_id in team_ids:
            try:
                print(f"Processing team_id {team_id} for {data_type} in year {year}...")
                df = ncaa_scraper.ncaa_team_stats(team_id, year, data_type, include_advanced=False)
                if df.empty:
                    print(f"No data for team_id {team_id} for {data_type} in year {year}. Skipping...")
                    continue

                school_name = lookup.lookup_school_reverse(team_id)
                df['school_name'] = f"{school_name[0]}"
                df['data_type'] = data_type  # New column to distinguish data types in unified table

                # Append new data to all_data and fill NaN values with zeros
                all_data = pd.concat([all_data, df]).reset_index(drop=True)
                all_data.fillna(0, inplace=True)

            except Exception as e:
                print(f"Error encountered while processing team_id {team_id} for {data_type} in year {year}: {e}")

        # Drop duplicate records based on relevant columns and keep the latest
        all_data.drop_duplicates(subset=['stats_player_seq', 'season', 'school_name', 'data_type'], keep='last', inplace=True)

        # Update the entire database in one go
        all_data.to_sql('collegebaseballplayer_unified', engine, if_exists='replace', index=False)

        print(f"{data_type} data processing for year {year} complete.")



get_player_data('pitching')
get_player_data('fielding')
get_player_data('batting')

#get_data('batting')
#get_data('fielding')
#get_data('pitching')