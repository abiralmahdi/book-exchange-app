import React, {useState, useEffect} from 'react'
import {Modal} from 'react-bootstrap'
import axios from 'axios'
import {Form} from 'react-bootstrap'
import SendIcon from '@material-ui/icons/Send';


function ChatBox(props) {
    const [texts, settexts] = useState([])
    const [textBox, settextBox] = useState('')
    const maxScroll = Math.pow(10, 1000)

    useEffect(() => {
        async function fetchTexts(){
            const req = await axios.get(`http://127.0.0.1:8000/chat/fetchText/${localStorage.getItem('userID')}/${parseInt(localStorage.getItem('chattingID'))}`)
            settexts(req.data)

            const req2 = await axios.get(`http://127.0.0.1:8000/accounts/fetchSingleUserUsingID/${localStorage.getItem('chattingID')}`)
            localStorage.setItem('chattingName', req2.data.fname + ' ' + req2.data.lname)


        }
        fetchTexts()
    }, [texts])



    // 
    function handleSubmit(e){
        axios.post(`http://127.0.0.1:8000/chat/sendText`,  {
            "userFromName": localStorage.getItem('userFullName'),
            "userToName": localStorage.getItem('chattingName'),
            "text": e.target[0].value,
            "userFrom": props.userID,
            "userTo": localStorage.getItem('chattingID')
        }).then(
            res => {
                settextBox('')
                if (document.getElementById('chatBoxConvo') === null){}
                else{
                  document.getElementById('chatBoxConvo').scrollTo(0, 10000000)
                  setInterval(2000)
                  document.getElementById('chatBoxConvo').scrollTo(0, 10000000)
                }
                
            }
        )
        e.preventDefault()
    }

    

    return (
        <Modal show={props.showChat} onHide={props.handleCloseChat} className='modal'>
        <Modal.Header className='bg-black text-light' closeButton>
          <Modal.Title>{localStorage.getItem('chattingName')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='chatBoxConversations' id='chatBoxConvo'>

            {texts.map(
            text => (
                <>         
                {
                text.userFrom === parseInt(localStorage.getItem('userID'))
                ?
                <><p className='textFromMe ml-auto py-1 px-3 my-0'>{text.text}</p><br/></>
                :
                <><p className='textFromHim mr-auto py-1 px-3 my-0'>{text.text}</p><br/></>
                } 
                
                </>
            )
            )}

            </div>
          <div>
            <form className='d-flex' onSubmit={handleSubmit}>
              <Form.Control as="textarea" rows={3} style={{marginTop:'50px', marginBottom:'50px'}} onChange={(e) => settextBox(e.target.value)} value={textBox}/>
               <button type='submit' style={{border: 'none', marginTop:'50px', marginBottom:'50px', cursor: 'pointer'}}><SendIcon/></button>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    )
}

export default ChatBox
