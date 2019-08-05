import React, { Component } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';

class CollapseCheckbox extends Component {
  state = {
    open: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initState) {
      this.setState({ open: this.props.initState });
    }
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleAngle = () =>
    this.state.open ? (
      <FaAngleUp className="icon" />
    ) : (
      <FaAngleDown className="icon" />
    );

  renderListItems = () =>
    this.props.list
      ? this.props.list.map(value => (
          <ListItem
            key={value._id}
            style={{
              padding: "0 0 0 10px"
            }}
          >
            <ListItemText primary={value.name} />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleCheckboxToggle(value._id)}
                checked={this.state.checked.indexOf(value._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))
      : null;

  handleCheckboxToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1); //delete 1 entry
    }
    
    this.setState({ checked: newChecked }, () => {this.props.handleFilters(newChecked)});
  };

  render() {
    return (
      <div>
        <List
          style={{ borderBottom: "1px solid var(--mainGrey)", padding: "0" }}
        >
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderListItems()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default CollapseCheckbox
