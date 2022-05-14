import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PostsList } from './features/posts/PostsList';
import { Header } from './app/Header';
import { AlbumsList } from './features/albums/AlbumsList';
import { SinglePostView } from './features/posts/SinglePostView';
import { UsersList } from './features/users/UsersList';
import { Container } from 'react-bootstrap';
import { SingleUserView } from './features/users/SingleUserView';
import { SingleAlbumView } from './features/albums/SingleAlbumView';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route exact path="/posts" element={<PostsList />} />
            <Route exact path="/posts/:postId" element={<SinglePostView />} />
            <Route exact path="/albums" element={<AlbumsList />} />
            <Route exact path="/albums/:albumId" element={<SingleAlbumView />} />
            <Route exact path="/users" element={<UsersList />} />
            <Route exact path="/users/:userId" element={<SingleUserView />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;
