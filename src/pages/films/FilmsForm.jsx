import React from 'react';
import { Button } from '../../common/components/Button/Button';

export class FilmsForm extends React.Component {
    state = {
        title: this.props.films ? this.props.films.title : "",
        year: this.props.films ? this.props.films.year : "",
        director: this.props.films ? this.props.films.director : "",
        rate: this.props.films ? this.props.films.rate : "",
        wouldLikeToSee: this.props.films ? this.props.films.wouldLikeToSee : '',
    }
    handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })
    }

    render() {
        return (
            <form className="form" onSubmit={(e) => {
                e.preventDefault();

            }}>
                <label>
                    Title:  
                    <input type="text" name="title" value={this.state.title} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Year: 
                    <input type="number" name="year" value={this.state.year} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Producer: 
                    <input type="text" name="director" value={this.state.director} onChange={this.handleOnChange}/>
                </label>
                <label>
                    Rate: 
                    <select name="rate" type="number" value={this.state.rate} onChange={this.handleOnChange}>
                        {(!this.state.rate) && <option value="">Rate</option>}
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        
                    </select>
                </label>
                <label>
                    Would like to see:
                    <select name="wouldLikeToSee" type="text" value={this.state.wouldLikeToSee} onChange={this.handleOnChange}>
                        {(!this.state.wouldLikeToSee) && <option value="">Would like to see</option>}
                        <option value="Seen">Seen</option>
                        <option value="No seen">No seen</option>
                        <option value="Want to see">Want to see</option>
                    </select>
                </label>
                <Button 
                    kind="change"
                    onClick={() => {
                    const rate = Number(this.state.rate);
                    this.props.onSave({
                        ...this.state,
                        rate, 
                    });
                }}
                >
                    {this.props.films ? "Change" : "Add"}
                </Button>
                <button onClick={() => this.props.onCancel()}>Come back</button>
            </form>
        )
    }
}