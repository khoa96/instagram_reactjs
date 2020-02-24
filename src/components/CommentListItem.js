import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../styles/CommentItem.css'
import { Link } from 'react-router-dom'
import ConfirmModal from './ConfirmModal';

export default class CommentListItem extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isOpenConfirmModal: false,
        }
    }
    
    onOpenDeleteCommentModal = () => {
        this.setState({
            isOpenConfirmModal: true,
        })
    }

    handleCloseConfirmModal = () => {
        this.setState({
            isOpenConfirmModal: false,
        })
    }

    handleDeleteComment(id) {
       this.props.deleteComment(id)
       this.setState({
           isOpenConfirmModal: false
       })
    }
    
    render() {
        const { id, body, username } = this.props.comment
        const { isOpenConfirmModal } = this.state
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        const usernameCurrentUser = currentUser.attrs.username
        return (
            <div className="CommentItem__root">
                <strong><Link to={`/${username}`} className="CommentItem__username"> {username} </Link></strong>
                <p className="comment-content">{body}</p>
                {/* button delete comment */}
                {
                    username === usernameCurrentUser ?
                        <span 
                            className="CommentItem__delete-button"
                            onClick={this.onOpenDeleteCommentModal}
                        >
                            <i className="fa fa-times" />
                        </span>
                        : null
                }

                {/*  confirm modal delete comment */}
                <ConfirmModal
                    isOpen={isOpenConfirmModal}
                    onRequestClose={this.handleCloseConfirmModal}
                    onClickConfirm={() => this.handleDeleteComment(id)}
                    confirmMessage="Delete comment"
                    cancelMessage="cancel"
                />
            </div>
        )
    }
}

CommentListItem.propTypes = {
    comment: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
}