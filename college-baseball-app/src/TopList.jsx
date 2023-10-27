import { Card, List, ListItemText, Typography } from '@mui/material'
import PropTypes from 'prop-types';

export default function TopList({ data, title}) {
    return (
        <Card variant="outlined">
            <Typography variant="h6">{title}</Typography>
            <List>
                {data.map((item, index) => (
                <ListItemText key={index}>
                    <Typography>{item.name}</Typography>
                </ListItemText>
                ))}
            </List>
        </Card>
    )
}

TopList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
  };