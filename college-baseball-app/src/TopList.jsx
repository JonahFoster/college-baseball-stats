import { Card, List, ListItem, Typography, Link } from '@mui/material';
import PropTypes from 'prop-types';

export default function TopList({ data, title, statKey }) {
    return (
        <Card variant="outlined">
            <Typography variant="h6">{title}</Typography>
            <List>
                {data.map((item, index) => (
                    <ListItem key={index}>
                        <Link href={`http://localhost:5173/player/${encodeURIComponent(item.name)}`}>{`${index + 1}. ${item.name} - ${item[statKey]}`}</Link>
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

TopList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    statKey: PropTypes.string.isRequired,
};
