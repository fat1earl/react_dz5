import React from 'react';

import { FilmsForm } from './FilmsForm';
import { Button } from '../../common/components/Button/Button';

import { getFilm, addFilm, deleteFilm, editFilm } from './server';
import { add, remove, update } from '../../common/utils/state';


const FilmsPageMode = {
    ADD: 'films_add',
    EDIT: 'films_edit',
    LIST: 'films_list'
}


export class FilmsPage extends React.Component {
    state = {
        isLoading: true,
        error: null,
        films: null,

        mode: FilmsPageMode.LIST,
        selectedFilmId: null,
    };

    makeRequest = async (requestFunction) => {
        this.setState({isLoading: true});

        try {
            await requestFunction();
        } catch(error) {
            this.setState(() => ({error}));
        } finally {
            this.setState({isLoading: false});
        }  
    };

    componentDidMount() {
        this.makeRequest(async () => {
            const films = await getFilm();

            this.setState(() => ({films}));
        }) 

    }

    addedFilm = (filmToAdd) => {
            this.setState({mode: FilmsPageMode.LIST});

            this.makeRequest(async () => {
                const addedFilms = await addFilm(filmToAdd);
                this.setState(({films}) => ({films: add(films, addedFilms)
                }))
            })
        }
    
    
    updateFilm = (filmUpdate) => {
        this.setState({mode: FilmsPageMode.LIST});
        this.makeRequest(async () => {
            const updatedFilm = await editFilm(this.state.selectFilmId, filmUpdate);

            this.setState(({films}) => ({
                films: update(films, this.state.selectFilmId, updatedFilm),
                selectFilmId: null,
            }))
        })
    }

    
    render() {
        
            if(this.state.isLoading) {
                return "....Loading films....";
            }
    
            if(this.state.error) {
                return "Sorry, something went wrong :( ";
            }    

        if(this.state.mode !== FilmsPageMode.LIST) {
            return <FilmsForm 
            films={this.state.selectedFilmId && this.state.films.find((f) => f.id === this.state.selectedFilmId)}
            onSave={
                this.state.mode === FilmsPageMode.ADD ? this.addedFilm : this.updateFilm
            }
            onCancel={() => this.setState({ mode: FilmsPageMode.LIST })}
            />
        }

        return (
            <>
            <Button 
            kind="success"
            onClick={() => this.setState({ mode: FilmsPageMode.ADD })}>Add film</Button>
            <table>
            <thead>
            <tr>
            
            <th>Title</th>
            <th>Year</th>
            <th>Director</th>
            <th>Rating (from 1 to 10)</th>
            <th>Would like to see</th>
            <th></th>
            <th></th>
            </tr>
            </thead>
                <tbody>
               
                    {this.state.films && this.state.films.map((film) => (
                        
                            <tr key={film.id}>
                            <td>{film.title}</td>
                            <td>{film.year}</td>
                            <td>{film.director}</td>
                            <td>{film.rate}</td>
                            <td>{film.wouldLikeToSee}</td>
                            <td>
                                <Button 
                                onClick={() =>
                                this.setState({
                                    mode: FilmsPageMode.EDIT,
                                    selectedFilmId: film.id,

                                })}
                                
                                >
                                    Edit</Button>
                                </td>
                            <td>
                            <Button
                                    kind='danger'
                                    onClick={ () => {
                                        this.makeRequest(async () => { 
                                            await deleteFilm(film.id);

                                        this.setState(({films}) => ({
                                            films: remove(films, film.id),
                                        }));

                                        })
                                    }}
                                >Delete</Button>

                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </>
        )
    }
}
