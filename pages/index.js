import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { videoService } from "../src/services/videoService";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
  const service = videoService();
  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  const [playlists, setPlaylists] = React.useState({});     // config.playlists

  React.useEffect(()=>{
    console.log("useEffect");
    service
        .getAllVideos()
        .then((dados) => {
            console.log(dados.data);
            // Forma imutavel
            const novasPlaylists = {};
            if (Array.isArray(dados.data)) {
                dados.data.forEach((video) => {
                    if (!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist].push(video);
                });
            } else {
                console.error("dados.data não é um array ou é undefined/null", dados.data);
            };

            setPlaylists(novasPlaylists);
        });
  },[])

  return (
    <>
        <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
        }}>
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro}/>
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists} />
        </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;

const StyledBanner = styled.div`
    background-color: blue;
    background-image: url(${({ bg }) => bg});
    background-repeat: repeat-x; /* Repetir horizontalmente */
    background-size: auto; /* Para manter tamanho original da imagem */
    height: 200px; /* default: 230 - Ajustar conforme necessário */
`;

function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg}/>
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}
function Timeline({searchValue, ...props}) {
  const playlistNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();
                  return titleNormalized.includes(searchValueNormalized)
                }).
                map((video) => {
                  return (
                    <a href={video.url} 
                       key={video.thumb}
                       target="_blank"
                       rel="noopener noreferrer"
                    >
                      <img src={video.thumb} alt={video.title}/>
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}