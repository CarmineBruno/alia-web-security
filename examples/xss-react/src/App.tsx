// @ts-nocheck
import React, { useState, useReducer, useContext } from 'react';
// import DOMPurify from 'dompurify';
import './App.css';
// import SafeHtml from './SafeHtml';

const ProfileContext = React.createContext(null);

function App() {
  const emptyProfile = {
    editing: false,
    name: 'Philippe De Ryck',
    bio: 'Teaching web security!',
    web: 'https://pragmaticwebsecurity.com',
    video: 'https://www.youtube-nocookie.com/embed/NPgVh5ozuZE',
  };

  // Load the profile from localstorage if present
  const stored = localStorage.getItem('profile');
  const initialProfile = stored ? JSON.parse(stored) : emptyProfile;

  const [profile, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'updateProfile':
        let profile = {
          ...action.payload,
          editing: false,
        };
        localStorage.setItem('profile', JSON.stringify(profile));
        return profile;
      case 'toggleEditing':
        return {
          ...action.payload,
          editing: !state.editing,
        };
      case 'clearProfile':
        localStorage.removeItem('profile');
        return emptyProfile;
      default:
        return state;
    }
  }, initialProfile);

  return (
    <div className="App">
      <h1>User profile</h1>
      <button
        onClick={() => dispatch({ type: 'toggleEditing', payload: profile })}
      >
        {profile.editing ? 'View' : 'Edit'}
      </button>
      {!profile.editing && (
        <button onClick={() => dispatch({ type: 'clearProfile' })}>
          Reset profile
        </button>
      )}

      <ProfileContext.Provider value={{ profile, dispatch }}>
        {profile.editing && <ProfileEdit profile={profile} />}
        {!profile.editing && <ProfileDisplay profile={profile} />}
      </ProfileContext.Provider>
    </div>
  );
}

function ProfileDisplay({ profile }) {
  return (
    <div>
      <h3>Name</h3>
      <p>{profile.name}</p>

      <h3>Bio</h3>
      <p>{profile.bio}</p>

      <h3>Website</h3>
      <a href={profile.web}>Open web page</a>

      <h3>Keynote video</h3>
      <iframe
        title="website"
        src={profile.video}
        width="450"
        height="300"
      ></iframe>
    </div>
  );
}

function ProfileEdit({ profile }) {
  const { dispatch } = useContext(ProfileContext);
  const [_profile, _setProfile] = useState(profile); // nosemgrep

  const updateField = (e) => {
    _setProfile({
      ..._profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = () => {
    dispatch({ type: 'updateProfile', payload: _profile });
    console.log('Saved profile');
  };

  return (
    <div>
      <h3>Name</h3>
      <p>
        <input
          type="text"
          size="60"
          name="name"
          value={_profile.name}
          onChange={updateField}
        />
      </p>

      <h3>Bio</h3>
      <p>
        <textarea
          name="bio"
          style={{ fontFamily: 'inherit' }}
          cols="60"
          rows="5"
          value={_profile.bio}
          onChange={updateField}
        ></textarea>
      </p>

      <h3>Website</h3>
      <p>
        <input
          type="text"
          size="60"
          name="web"
          value={_profile.web}
          onChange={updateField}
        />
      </p>

      <h3>Keynote video</h3>
      <p>
        <input
          type="text"
          size="60"
          name="video"
          value={_profile.video}
          onChange={updateField}
        />
      </p>
      <br />
      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

/*
 * URL Sanitization code based on Angular's URL sanitizer
 */
const SAFE_URL_PATTERN =
  /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi;
const DATA_URL_PATTERN =
  /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;

function _sanitizeUrl(url) {
  url = String(url);
  if (url === 'null' || url.length === 0 || url === 'about:blank')
    return 'about:blank';
  if (url.match(SAFE_URL_PATTERN) || url.match(DATA_URL_PATTERN)) return url;

  return `unsafe:${url}`;
}

function sanitizeUrl(url = 'about:blank') {
  return _sanitizeUrl(String(url).trim());
}

/*
 * Safe resource URL handling for loading YT videos
 */

function getYoutubeVideo(videoId) {
  // Always define scheme, host and path separator to fixate the host
  const host = 'https://www.youtube-nocookie.com/embed/'; // Run a sanity check on the full URL to make sure the URL is safe

  return sanitizeUrl(`${host}${videoId}`);
}

export default App;
