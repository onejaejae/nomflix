import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";

const Container = styled.div`
    height : calc(100vh - 50px);
    width : 100%;
    position : relative;
    padding : 50px;
`;

const Backdrop = styled.div`
    position : absolute;
    top : 0;
    left : 0;
    width : 100%;
    height : 100%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    filter : blur(3px);
    opacity : 0.5;
    z-index : 0;
`;

const Content = styled.div`
    display : flex;
    width : 100%;
    position : relative;
    z-index : 1;
    height : 100%;
`;

const Cover = styled.div`
    width : 30%;
    background-image : url(${props => props.bgImage});
    background-position : center center;
    background-size : cover;
    height : 100%;
    border-radius : 5px;
`;

const Data = styled.div`
    width : 70%;
    margin-left : 10px;
`;

const Title = styled.h3`
    font-size : 32px;
`;

const ImdbContainer = styled.span`
    font-size: 12px;
    font-weight: 700;
    margin-left: 10px;
    text-align: center;
    color: black;
    padding: 0px 6px;
    border-radius: 4px;
    background: rgb(245, 197, 24);
`;

const Imdb = styled.a`
   
`;

const ItemContainer = styled.div`
    margin : 20px 0;
`;

const Item = styled.span`
    
`;

const Divider = styled.span`
    margin : 0px 10px;
`;


const Overview = styled.p`
    font-size : 12px;
    opacity : 0.7;
    line-height : 1.5;
    width : 50%;
`;

const Taps = styled.div`
    margin-top:30px;
`;

const TapItemContainer = styled.div`
    max-width: 500px;
    max-height: 400px;
    overflow-y: auto;
    padding: 20px;
`;

const DetailList = styled.a`
    display: list-item;
    text-align: -webkit-match-parent;
    opacity: 0.5;
    cursor: pointer;
    
    padding: 10px 20px;

    &:hover{
        opacity : 1;
    } 
   
    display: ${props => props.display};
`;

const TapItem = styled.li`
 
    display: list-item;
    text-align: -webkit-match-parent;
    opacity: 0.5;
    cursor: pointer;
    border-bottom: 2px solid rgba(255, 255, 255, 0.5);
    padding: 10px 30px;

    &:hover{
        opacity : 1;
    }

    &:active{
        opacity : 1;
    }

   
`;

const TapsList = styled.ol`
    margin-top: 50px;
    display: flex;
    list-style: none;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    
`;

const CompanyMark = styled.div`
    display: flex;
    flex-wrap: wrap;
    -webkit-box-align: center;
    align-items: center;
    width: 400px;
`;

const BgContainer = styled.div`
   margin-bottom: 20px;
    margin-right: 30px;
    opacity: 0.7;
    text-align: center;
    &:hover{
        opacity : 1;
    } 
`;

const CompanyContainer = styled.div`
    height: 60px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    max-width: 100px;
    
`;


const BgCompany = styled.img`

    max-width: 100px;
    max-height: 50px;
    margin-bottom: 10px;
    display: block;

`
const CompanyName = styled.div`
    font-size: 10px;
    opacity: 0.5;
    max-width: 100px;
`;

const Country = styled.div`
    max-width: 500px;
    max-height: 400px;
    overflow-y: auto;
    padding: 20px;
    margin-bottom: 10px;
    opacity: 0.5;
       &:hover {
        opacity: 1;
    }
`;

const SeasonImage = styled.img`
    max-width: 60px;
    display: block;
`;

const A = styled.div`
    display:flex
`;

const B = styled.img``;

const DetailPresenter = ({ result, loading, error }) => {

    const [flag, setFlag] = useState(false);
    const [company, setCompany] = useState(true);
    const [country, setCountry] = useState(true);
    const [season, setSeason] = useState(true);

    return (
        loading ? (
            <>
                <Loader />
                <Helmet>
                    <title>Loading | Wonflix</title>
                </Helmet>
            </>
        ) :
            <Container>
                <Helmet>
                    <title>{result.original_title ? result.original_title : result.original_name} | Wonflix</title>
                </Helmet>
                <Backdrop bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`} />
                <Content>
                    <Cover bgImage={result.poster_path ? `https://image.tmdb.org/t/p/original${result.poster_path}` : require("../../assets/noPosterSmall.png")} />
                    <Data>
                        <Title>
                            {result.original_title ? result.original_title : result.original_name}
                            <ImdbContainer>
                                <Imdb href={result.imdb_id ? `https://www.imdb.com/title/${result.imdb_id}` : `https://www.imdb.com/title/${result.external_ids.imdb_id}`} target="_blank">IMDB</Imdb>
                            </ImdbContainer>

                        </Title>
                        <ItemContainer>
                            <Item>
                                {result.first_air_date ? result.first_air_date.substring(0, 4) : result.release_date.substring(0, 4)}
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.runtime ? result.runtime : result.episode_run_time[0]} min
                            </Item>
                            <Divider>•</Divider>
                            <Item>
                                {result.genres && result.genres.map((genre, index) => index === result.genres.length - 1 ? genre.name : `${genre.name} / `)}
                            </Item>
                        </ItemContainer>
                        <Overview>{result.overview}</Overview>
                        {/* <ItemContainer>
                        {result.videos.results.map(detail => <ItemContainer key={detail.id}><Imdb href={`https://www.youtube.com/watch?v=${detail.key}`} target="_blank" >{detail.name}</Imdb><ItemContainer><iframe src={`https://www.youtube.com/embed/${detail.key}` } key={detail.id} width="500" height="282" title={detail.name}></iframe></ItemContainer></ItemContainer>)}
                    </ItemContainer> */}
                        <Taps>
                            <TapsList>
                                <TapItem onClick={() => {
                                    setFlag(false);
                                    setCountry(true);
                                    setCompany(true);
                                    setSeason(true);
                                }}>
                                    Videos
                                   
                                </TapItem>
                                <TapItem onClick={() => {
                                    setFlag(true);
                                    setCountry(true);
                                    setSeason(true);
                                    setCompany(false);
                                }}>Companies</TapItem>
                                <TapItem onClick={() => {
                                    setFlag(true);
                                    setCompany(true);
                                    setSeason(true);
                                    setCountry(false);
                                }}>Countries</TapItem>
                                <TapItem onClick={() => {
                                    setFlag(true);
                                    setCompany(true);
                                    setCountry(true); 
                                    setSeason(false);
                                }} >Series</TapItem>
                            </TapsList>
                        </Taps>
                            {flag ? null : result.videos.results.map(detail => <DetailList key={detail.id} display={ flag  ? "none" : "block"} href={`https://www.youtube.com/watch?v=${detail.key}`} target="_blank">{detail.name}</DetailList>)}
                            {company ? null :result.production_companies.map(detail =><TapItemContainer><CompanyMark><BgContainer><CompanyContainer><BgCompany  key={detail.id} src={detail.logo_path ? `https://image.tmdb.org/t/p/original${detail.logo_path}` :  require("../../assets/noPosterSmall.png")}></BgCompany></CompanyContainer><CompanyName key={detail.id}>{detail.name}</CompanyName></BgContainer></CompanyMark></TapItemContainer>)}
                            {result.production_countries ? country ? null : result.production_countries.map(detail => <Country>{detail.name}</Country>) :  country ? null : result.production_companies.map(detail => <ItemContainer><Country>{detail.origin_country}</Country></ItemContainer>)}
                            {result.seasons ?  season ? null : result.seasons.map(detail =><TapItemContainer><BgContainer><SeasonImage  key={detail.id} src={detail.poster_path ? `https://image.tmdb.org/t/p/original${detail.poster_path}` : require("../../assets/noPosterSmall.png")}></SeasonImage></BgContainer><Overview>{detail.name}</Overview></TapItemContainer> ) : <></>}
                    </Data>
                </Content>
            </Container>
    )

}

DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired
}


export default DetailPresenter;