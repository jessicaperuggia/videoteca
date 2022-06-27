import { useEffect, useState } from 'react';
import { useParams, useNavigate	 } from 'react-router-dom';
import './filme-info.css';
import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();
    const [ filme, setFilme ] = useState({});
    const [ loading, setLoading ] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: 'a22253fd590ca44724031ea6bf4912aa',
                    language: 'pt-BR',
                }
            })
            .then((response)=>{
                //console.log(response.data); 
                setFilme(response.data);
                setLoading(false);               
            })
            .catch(()=>{
                console.log('filme não encontrado');
                navigation('/', { replace: true });
                return;
            })
        }

        loadFilme();

        return ()=>{
            console.log('componete desmontado')
        }
    }, [navigation, id])

    if(loading){
        return(
            <div className='filme_info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
        <div className='filme_info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area_buttons'>
                <button>Salvar</button>
                <button>
                    <a target='_blank' rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;