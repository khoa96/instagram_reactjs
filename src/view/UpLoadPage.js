import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadPost } from '../actions/postActions'
import Modal from 'react-modal'
import NewPostButton from '../components/NewPostButton';
import CreatNewPostContainer from '../containers/CreatNewPostContainer';

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.8)'
    },
    content: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        right: 'initial',
        bottom: 'initial',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '30px'

    }
}

class UpLoadPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenModal: false
        }
    }
    // handleChangeUploadImage(event) {
    //     this.setState({
    //         file: event.target.files[0]
    //     })
    // }

    // handleSubmitForm = event => {
    //     event.preventDefault()
    //     this.props.dispatchUploadPost(this.state.file)
    // }

    // handleClick = () => {
    //     console.log('click')
    // }

    // handleDropPicture = (acceptedFiles, rejectedFiles) => {
    //     let currentFile = acceptedFiles[0]
    //     let reader = new FileReader()
    //     reader.addEventListener("load", () => {
    //         this.setState({
    //             imageReview: reader.result
    //         })
    //     })
    //     reader.readAsDataURL(currentFile)

    // }
    onOpenModal = () => {
        this.setState({
            isOpenModal: true
        })
    }

    hanldeCloseModal = () => {
        this.setState({
            isOpenModal: false
        })
    }
    render() {
        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.isOpenModal}
                    onRequestClose={this.hanldeCloseModal}
                    style={customStyles}
                >
                    <CreatNewPostContainer />
                </Modal>
                <NewPostButton onClick={this.onOpenModal} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        prop: state.prop
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        dispatchUploadPost: (file) => dispatch(uploadPost(file))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UpLoadPage)