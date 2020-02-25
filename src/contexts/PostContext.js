import React, { Component} from 'react';
import axios from 'axios';
import { withUser } from './UserContext';
import { withOverlayLoading } from './OverlayLoadingContext';

export const defaultValue = {
  posts: [],
  mappedComments: {},
  isFetchingPosts: false,
  isFetchingComments: false,
  fetchPosts: () => {},
  clearPost: () => {},
  updatePost: () => {},
  fetchCommentByPostId: () => {},
  deletePost: () => {},
};

export const PostContext = React.createContext(defaultValue);

class PostStoreClass extends Component {
  state = defaultValue

  fetchPosts = async (userId) => {
    try {
      this.setState({isFetchingPosts: true});
      let { data: posts } = await axios.get(`/users/${userId}/posts`);

      this.setState({
        posts
      });
    } catch (err) {
      console.log('ERROR WHILE FETCHING POSTS', err);
    } finally {
      this.setState({isFetchingPosts: false});
    }
  }

  fetchCommentByPostId = async postId => {
    try {
      this.setState({isFetchingComments: true});
      let { data: comments } = await axios.get(`/posts/${postId}/comments`);

      this.setState({
        mappedComments: {
          ...this.state.mappedComments,
          [postId]: comments
        }
      });
    } catch (err) {
      console.log('ERROR WHILE FETCHING POSTS', err);
    } finally {
      this.setState({isFetchingComments: false});
    }
  }

  updatePost = async (postId, body) => {
    try {
      this.props.overlayLoadingContext.show();
      let { data } = await axios.put(`/posts/${postId}`, body);
      await this.fetchPosts(this.props.userContext.user.id);
      return data;
    } catch (err) {
      console.log('ERROR WHILE FETCHING POSTS', err);
    } finally {
      this.props.overlayLoadingContext.hide();
    }
  }

  deletePost = async (postId) => {
    try {
      this.props.overlayLoadingContext.show();
      let { data } = await axios.delete(`/posts/${postId}`);
      await this.fetchPosts(this.props.userContext.user.id);
      return data;
    } catch (err) {
      console.log('ERROR WHILE FETCHING POSTS', err);
    } finally {
      this.props.overlayLoadingContext.hide();
    }
  }

  render() {
    return (
      <PostContext.Provider
        value={{
          ...this.state,
          fetchPosts: this.fetchPosts,
          clearPost: this.clearPost,
          fetchCommentByPostId: this.fetchCommentByPostId,
          updatePost: this.updatePost,
          deletePost: this.deletePost,
        }}
      >
        {this.props.children}
      </PostContext.Provider>
    );
  }
}

export const PostStore = withOverlayLoading(withUser(PostStoreClass));

export const withPost = Comp => props => (
  <PostContext.Consumer>
    {context => <Comp {...props} postContext={context} />}
  </PostContext.Consumer>
);