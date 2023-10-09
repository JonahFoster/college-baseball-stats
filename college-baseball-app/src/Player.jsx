import PropTypes from 'prop-types';


export default function Player({ data }) {
  return (
    <div>
        <h1>{data[0].name}</h1>
    </div>
  );
}

Player.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
