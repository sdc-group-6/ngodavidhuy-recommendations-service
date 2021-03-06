import React from 'react';
import axios from 'axios';
import Carousel from './Carousel.jsx';
import TooltipList from './TooltipList.jsx';
const AWS = require('../../../config.js').AWS;

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.scroller = React.createRef();
    this.state = {
      restaurants: [],
      buttonNext: true,
      buttonPrev: false,
      hover: 0,
      position: [0, 0],
    };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.hoverIn = this.hoverIn.bind(this);
    this.hoverOut = this.hoverOut.bind(this);
    this.scroll = this.scroll.bind(this);
  }

  componentDidMount() {
    // const route = this.props.id !== undefined ? `http://${AWS.publicIP}:3005/restaurants/${this.props.id}/suggestions` : `http://${AWS.publicAP}:3005/restaurants/1/suggestions`;
    const route = `${window.location.pathname}/suggestions`;
    axios.get(route)
      .then((response) => {
        let restaurants = response.data.filter( restaurant => {
          return restaurant._id !== this.props.restaurantId;
        });

        if (restaurants.length !== 12) {
          restaurants.pop();
        }

        this.setState({
          restaurants,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  next() {
    this.scroller.current.scrollLeft += this.scroller.current.offsetWidth - 10;
  }

  back() {
    this.scroller.current.scrollLeft -= this.scroller.current.offsetWidth - 10;
  }

  scroll() {
    if (this.scroller.current.scrollLeft < this.scroller.current.scrollWidth - this.scroller.current.clientWidth) {
      this.setState({
        buttonNext: true,
      });
    } else {
      this.setState({
        buttonNext: false,
      });
    }

    if (this.scroller.current.scrollLeft > 0) {
      this.setState({
        buttonPrev: true,
      });
    } else {
      this.setState({
        buttonPrev: false,
      });
    }
  }

  hoverIn(id, e) {
    const position = [e.target.getBoundingClientRect().left - 120, 290];
    this.setState({
      hover: id,
      position,
    });
  }

  hoverOut() {
    this.setState({
      hover: 0,
      position: [0, 0],
    });
  }

  render() {
    return (
      <div className="suggestionsContainer">
        <div>
          <h3 style={ {padding: '0 20px'} }>Sponsored restaurants in your area</h3>
        </div>
        <Carousel restaurants={this.state.restaurants} next={this.next} back={this.back}
        buttonNext={this.state.buttonNext} buttonPrev={this.state.buttonPrev} hoverIn={this.hoverIn}
        hoverOut={this.hoverOut} scroll={this.scroller} scrolling={this.scroll} />
        <TooltipList restaurants={this.state.restaurants} hover={this.state.hover} position={this.state.position} />
      </div>
    );
  }
}

export default Suggestions;
