import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
    padding : 0px 20px;
`; 

const Form = styled.form`
    margin-bottom : 50px;
    width:100%;
`;

const Input = styled.input`
    all:unset;
    font-size : 28px;
    width : 100%;
`;

const Searchpresenter = ({movieResults, tvResults, searchTerm, loading, error, handleSubmit, updateTerm}) => 
<Container>
        <Helmet>
            <title>Search | Wonflix</title>
        </Helmet>
    <Form onSubmit={handleSubmit}>
        <Input 
            placeholder="Search Movies or TV Shows..." 
            value={searchTerm}
            onChange={updateTerm}
        />
    </Form>
    {loading ? <Loader/> : <>
        {movieResults && movieResults.length>0 && <Section title="Movie Results">
    {movieResults.map(movie =>   
        <Poster 
            key={movie.id} 
            id={movie.id} 
            imageURL={movie.poster_path}
            title={movie.original_title} 
            rating={movie.vote_average}
            year = {movie.release_date && movie.release_date.substring(0,4)}
            isMovie = {true}
         />
    )}
    </Section>}
    </>}
    {loading ? <Loader/> : <>
        {tvResults && tvResults.length>0 && <Section title="TV Show Results">
            {tvResults.map(show =>  
                <Poster 
                    key={show.id} 
                    id={show.id} 
                    imageURL={show.poster_path}
                    title={show.original_name} 
                    rating={show.vote_average}
                    year = {show.first_air_date && show.first_air_date.substring(0,4)}
                />)}
        </Section>}
    </>}
    {error && <Message color="#e74c3c" text={error}/>}
    {movieResults && tvResults && movieResults.length===0 && tvResults.length===0 && <Message text="Nothing found" color="#95a5a6"/>}
</Container>

Searchpresenter.propTypes = {
    movieResults:PropTypes.array,
    tvResults:PropTypes.array,
    error:PropTypes.string,
    searchTerm:PropTypes.string,
    loading:PropTypes.bool.isRequired,
    handleSubmit : PropTypes.func.isRequired,
    updateTerm : PropTypes.func.isRequired
}
 
export default Searchpresenter;

