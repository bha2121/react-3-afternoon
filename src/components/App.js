import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

const baseUrl = "https://practiceapi.devmountain.com/api/"

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${baseUrl}/posts`)
    .then(res => { 
      // console.log("POST IS WORKING", res)
      this.setState({
        posts: res.data
      })
    })
    .catch(res => {
      console.log('ERRORRRRRR', res)
    })
  }

  updatePost(id, text) {
    console.log('PUT IS WORKING')
    axios.put(`${baseUrl}/posts?id=${id}`, {text})
    .then(res => { 
      this.setState({
        posts: res.data 
      })
    })
    .catch(res => {
      console.log('ERRORRRRRR', res)
    })
  }
  
  
  deletePost() {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {
      this.setState({ posts: results.data });
    });
  }
  
  createPost() {
    // axios.post(`${baseUrl}`/posts)
    axios.post('https://practiceapi.devmountain.com/api/posts', { text }).then( results => {
      this.setState({ posts: results.data });
    });
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose/>
          {posts.map((el)=> <Post updatePostFn={this.updatePost} 
                                  deletePostFn={ this.deletePost }
                                  id={el.id} 
                                  text={el.text} 
                                  date={el.date} 
                                  key={el.id}/>)}
          
        </section>
      </div>
    );
  }
}

export default App;
