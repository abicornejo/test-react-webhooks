import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [gitHubUsrName, setGitHubUsrName] = useState('abicornejo');
    const [showError, setShowError] = useState(false);
    const [lstRepository, setLstRepository] = useState([]);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        fetch(`https://api.github.com/users/${gitHubUsrName}/repos`)
            .then(res => res.json())
            .then((data) => {
                if(data.message === "Not Found"){
                    setShowError(true);
                }else if(data && !data.length){
                    setShowError(true);
                }
                else{
                    setShowError(false);
                    setLstRepository(data);
                }

            })
        .catch((error)=>console.log(error))
    }

    const items = lstRepository.map((item, index) => {

    return (<tr>
              <td>{item.name}</td>
              <td>{item.html_url}</td>
              <td>{item.stargazers_count}</td>
          </tr>);
    });
    const user = {};
  if(lstRepository && lstRepository.length){debugger;
      user.avatar = (lstRepository[0].owner.avatar_url);
      user.name = (lstRepository[0].owner.login);
  }

  return (

    <div className="container">
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="txtNomMUsr">GitHub Name: </label>
                <input type="text" value={gitHubUsrName} onChange={e => setGitHubUsrName(e.target.value)}/>
                <input type="submit" value="Submit" />
            </div>
        </form>

        <div className={showError ? 'block' :'hidden'}>
            <div className="alert alert-danger" role="alert">
                User Not Found
            </div>
        </div>
        <div className={lstRepository && lstRepository.length === 0 || showError ? 'invisible':'visible row'}>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <label htmlFor="">UserName: {user.name}</label><br/>
                        <label htmlFor="">Avatar: </label>
                        <img src={user.avatar} height={50} width={50}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th>Repository Name</th>
                                <th>Repository Link</th>
                                <th>Number of stars</th>
                            </tr>
                            </thead>
                            <tbody>
                            {items}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default App;
