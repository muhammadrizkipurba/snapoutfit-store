import React, { Component } from 'react';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class CollapseRadio extends Component {
    
    state = {
        open: false,
        value: "0"
    }

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

    renderListItems = () => (
        this.props.list ? 
            this.props.list.map(value => (
                <FormControlLabel 
                    key={value._id}
                    value={`${value._id}`}
                    control={<Radio/>}
                    label={value.name}
                    style={{
                      padding: "0 0 0 10px",
                      fontSize: "140px"
                    }}
                /> 
            ))
        : null
    )

    handleChange = (e) => {
        this.props.handleFilters(e.target.value)
        this.setState({ value: e.target.value })
    }

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
                            <RadioGroup
                                aria-label="prices"
                                name="prices"
                                value={this.state.value}
                                onChange={this.handleChange}
                                icon={<Radio style={{fontSize: "10px" }} />}
                            >
                                {this.renderListItems()}
                            </RadioGroup>
                        </List>
                    </Collapse>
                </List>
            </div>
        )
    }
}

export default CollapseRadio;
