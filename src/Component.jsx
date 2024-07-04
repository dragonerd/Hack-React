import React, { useState } from 'react';


const UserSearch = () => {
  const [userData, setUserData] = useState([
    { username: 'moises', email: 'moises@example.com', age: 35 },
    { username: 'ana', email: 'ana@example.com', age: 28 },
    { username: 'pedro', email: 'pedro@example.com', age: 42 },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editUsername, setEditUsername] = useState(''); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const deleteUser = (username) => {
    const updatedUserData = userData.filter((user) => user.username !== username);
    setUserData(updatedUserData);
  };

  const handleEditUser = (username, updatedUserData) => {
    setUserData(userData.map((user) => {
      if (user.username === username) {
        return updatedUserData;
      }
      return user; 
    }));
    setIsEditing(false);
    setEditUsername(''); 
  };
 
  const filteredUsers = userData.filter((user) => {
    const usernameLower = user.username.toLowerCase();
    const emailLower = user.email.toLowerCase();
    const searchTextLower = searchTerm.toLowerCase();
    return usernameLower.includes(searchTextLower) || emailLower.includes(searchTextLower);
  });

  function truncateUsername(username, maxLength = 7) {
    return username.length > maxLength ? username.substring(0, maxLength) + '...' : username;
  }

  return (
    <div className="user-search">
      <input type="text" placeholder="Buscar usuario" value={searchTerm} onChange={handleChange}/>
      <div className="user-list">
        {filteredUsers.map((user) => (
          <div className="user-item" key={user.username}>
            
            {isEditing && user.username === editUsername ? (
              <form onSubmit={(event) => {event.preventDefault();
              const updatedData = {username: event.target.elements.username.value, email: event.target.elements.email.value,age: parseInt(event.target.elements.age.value),};handleEditUser(user.username, updatedData);}}>
                <input type="text"name="username" defaultValue={user.username}/>
                <input type="email" name="email" defaultValue={user.email} />
                <input type="number" name="age" defaultValue={user.age} />
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button></form>) : 
                (
              <>
               <p>Total usuarios: {filteredUsers.length}</p>
                <h3>{truncateUsername(user.username)}</h3>
                <p>{user.email}</p>
                <p>Edad: {user.age}</p>
                <button onClick={() => deleteUser(user.username)}>Eliminar</button>
                <button
                  onClick={() => {setIsEditing(true);setEditUsername(user.username);}}>Editar</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch;