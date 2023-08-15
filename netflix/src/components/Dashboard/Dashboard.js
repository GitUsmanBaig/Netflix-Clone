import React, { useEffect, useMemo, useState } from 'react';
import Particles from 'react-particles';
import './dashboard.scss';
import Navbar from './dashboardnavbar/DashboardNavbar';
import SortingTable from '../Table/SortingTable';
import { useNavigate } from 'react-router-dom';
import { column } from '../Table/Column';
import { Movie } from '../Table/MovieColumn';
import { Add, Delete, ModeEdit } from '@mui/icons-material';
import { toast } from 'react-toastify'
import BarChart from '../Charts/BarChart';
import DoughnutChart from '../Charts/DoughnutChart';

const SideBarButtons = ({ name, setButtonName }) => {
  return (<>
    <li>
      <button
        className='button'
        onClick={() => {
          setButtonName(name);
        }}
      >
        {name}
      </button>
    </li>
  </>)
}
const Dashboard = () => {

  const navigate = useNavigate();

  const [buttonName, setButtonName] = useState('Home');
  const [tabledata, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalmovies, setTotalMovies] = useState(0);
  const [totalusers, setTotalUsers] = useState(0);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const getData = await response.json();
      if (response.status === 200) {
        toast.success(getData.message);
        handleUserData();
      } else {
        toast.error('Cannot Find Data');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleMovieDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/deletemovie/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const getData = await response.json();
      if (response.status === 200) {
        toast.success(getData.message);
        handleMovieData();
      } else {
        toast.error('Cannot Find Data');
      }
    } catch (err) {
      console.log(err);
    }
  }

  const totalMovies = async () => {
    try {
      const response = await fetch('http://localhost:3001/countmovie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const res = await response.json();
      if (res.status === 200) {
        setTotalMovies(res.data[0].TOTAL_MOVIE
        );
      } else {
        toast.error('Cannot Find Data');
      }
    } catch (err) {
      console.log(err);
    }
  }



  const totalUsers = async () => {
    try {
      const response = await fetch('http://localhost:3001/countusers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const res = await response.json();
      if (res.status === 200) {
        setTotalUsers(res.data[0].TOTAL_USERS);
      } else {
        toast.error('Cannot Find Data');
      }
    } catch (err) {
      console.log(err);
    }
  }




  useEffect(() => {
    // totalMovies();
    if (buttonName === 'Users') {
      handleUserData();
    }
    else if (buttonName === 'Movie') {
      handleMovieData();
    }
    else if (buttonName === 'Rating') {
      handleMovieData();
    }
    totalMovies();
    totalUsers();
  }, [buttonName]);

  const columns = useMemo(() => {
    if (buttonName === 'Users') {
      return column;
    } else if (buttonName === 'Movie') {
      return Movie;
    }
    else if (buttonName === 'Rating') {
      return column;
    }
    else {
      return [];
    }
  }, [buttonName]);

  const handleUserData = async () => {
    try {
      const getdata = await fetch('http://localhost:3001/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const response = await getdata.json();
      if (response) {
        setLoading(true);
        let data = [];
        response.data.forEach((item) => {
          data.push({
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            email: item.email,
            action: (
              <div className='button'>
                <button className='left' onClick={() => { handleDelete(item.id) }}>
                  <Delete />
                </button>
                <button className='right' onClick={() => {
                  navigate('/UpdateUser')
                }}>
                  <ModeEdit />
                </button>
              </div>
            ),
          });
        });
        setTableData(data);
        setLoading(false);
      }
      else {
        alert('No data found');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleMovieData = async () => {
    try {
      const getdata = await fetch('http://localhost:3001/getmovie', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const response = await getdata.json();

      if (response) {
        setLoading(true);
        let data = [];
        response.data.forEach((item) => {
          data.push({
            id: item.id,
            name: item.name,
            genre: item.genre,
            year: item.year,
            rating: item.rating,
            description: item.description,
            // image: item.image,
            video: item.video,
            actors: item.actors,
            image: (<div className='Imagebox'>
              <img src={item.image} alt='' />
            </div>),
            action: (
              <div className='button'>
                <button className='left' onClick={() => { handleMovieDelete(item.id) }}>
                  <Delete />
                </button>
                <button className='right' onClick={() => {
                  localStorage.setItem('movie', JSON.stringify(item.id));
                  navigate('/UpdateMovie')

                }}>
                  <ModeEdit />
                </button>
              </div>
            ),
          });
        });
        setTableData(data);
        setLoading(false);
      }
      else {
        alert('No data found');
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };


  return (
    <div>
      <div className='dashboard'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='row'>
          <div className='col-4'>
            <ul className='unorderedlist'>
              {/* <li>
                <button className='button' onClick={() => {
                  setButtonName('Home');
                }}>Home</button>
              </li> */}
              <SideBarButtons name="Home" setButtonName={setButtonName} />
              <SideBarButtons name="Users" setButtonName={setButtonName} />
              <SideBarButtons name="Movie" setButtonName={setButtonName} />
              <SideBarButtons name="Rating" setButtonName={setButtonName} />
        
            </ul>
          </div>
          {buttonName === 'Home' && (
            <div className='col-8'>
              <div className='homecomponents'>
                <div className='totalmovies'>
                  {totalmovies && <span>
                    Total Movies: {totalmovies}
                  </span>}
                </div>
                <div className='totalusers'>
                  {
                    totalusers && <span>
                      Total Users: {totalusers}
                    </span>
                  }
                </div>
              </div>
            </div>
          )}
          {buttonName === 'Users' && (
            <div className='col-8'>
              {loading ? (
                <div className='loading'>Loading...</div>
              ) : (
                <div className='Table'>
                  <SortingTable columns={columns} data={tabledata} />
                </div>
              )}
            </div>
          )}
          {buttonName === 'Movie' && (
            <div className='col-8'>
              {loading ? (
                <div className='loading'>Loading...</div>
              ) : (
                <div className='Table'>
                  <button className='AddButton'>
                    <Add onClick={() => {
                      navigate('/AddMovie')
                    }} />
                  </button>
                  {loading ? (
                    <div className='loading'>Loading...</div>
                  ) : (
                    <div className='Table'>
                      <SortingTable columns={columns} data={tabledata} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
          {
            buttonName === 'Rating' && (
              <div className='col-8'>
                {loading ? (
                  <div className='loading'>Loading...</div>
                ) : (
                  <>
                    <span className='chartname'> Bar Chart</span>
                    <div className='BarChart'>
                      {/* <h1>Bar Chart</h1> */}
                      <BarChart />
                    </div>
                    <span className='chartname'> Doughnut Chart</span>
                    <div className='DoughnutChart'>
                      <DoughnutChart />
                    </div>
                  </>
                )}
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
