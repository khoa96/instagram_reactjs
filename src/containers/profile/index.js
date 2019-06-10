import React, { Component } from 'react'
import PropTypes from 'prop-types'
import HeaderProfileContainer from './HeaderProfileContainer'
import PhotoGirdProfileContainer from './PhotoGirdProfileContainer'
import { connect } from 'react-redux'
import { 
    getPostsByUsername,
    getUserPublicProfile,
} from '../../actions/profileActions'
import {
    getIsFetchingProfileSelector,
    getPostsProfileSelector,
    getProfilePaginationSelector,
    getUserProfileSelector,
} from '../../selector/profileSelector'
import Spinner from '../../components/Spinner'

class ProfilePage extends Component {

    componentDidMount() {
        const { username } = this.props
        this.props.dispatchGetUserPublicProfile(username)
        this.props.dispatchGetPostsByUsername(username, 1)
    }

    render() {
        const { isFetching, posts, profilePagination, publicProfile } = this.props
        return (
            <div className="Profile__root container">
                <HeaderProfileContainer 
                    publicProfile={publicProfile}
                    postsLength={posts.length}
                />
                {/* hien thi danh sach cac bai post cua user */}
                {
                    isFetching ?
                        <div className="PhotoGallery__spinner-container">
                            <Spinner />
                        </div> :
                        <PhotoGirdProfileContainer
                            posts={posts}
                            profilePagination={profilePagination}
                        />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: getIsFetchingProfileSelector(state),
        posts: getPostsProfileSelector(state),
        profilePagination: getProfilePaginationSelector(state),
        publicProfile: getUserProfileSelector(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchGetPostsByUsername: (username, pageNumber) => dispatch(getPostsByUsername(username, pageNumber)),
        dispatchGetUserPublicProfile: username => dispatch(getUserPublicProfile(username)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)

ProfilePage.propTypes = {
    username: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    profilePagination: PropTypes.object.isRequired,
    publicProfile: PropTypes.object.isRequired,
}