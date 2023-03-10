import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Header from './Header'
import JoditEditor from 'jodit-react'
import { database } from '../firebase';

import { useAuth } from '../contexts/AuthContext'
// import RichTextEditor from 'react-rte'

import { useHistory } from 'react-router-dom'

export default function CreatePost() {

    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")
    // const [topic, setTopic] = useState("")
    const [level, setLevel] = useState("opinions")
    const [subject, setSubject] = useState("science")
    const [Bclass, setClass] = useState("science")
    const [blog, setBlog] = useState("Start Writing...")


    const headingRef = useRef()
    const subHeadingRef = useRef()
    // const topicRef = useRef()
    const blogRef = useRef()


    const history = useHistory()
    
    const { currentUser, logout } = useAuth()

    const handleHeadingChange = (e) => {
        setHeading(headingRef.current.value)
    }
    const handleSubHeadingChange = (e) => {
        setSubHeading(subHeadingRef.current.value)
    }
    const handleLevelChange = (e) =>{
        setLevel(e.target.value)
    }
    const handleClassChange = (e) =>{
        setClass(e.target.value)
    }
    const handleSubjectChange = (e) =>{
        setSubject(e.target.value)
    }
    // const handleTopicChange = (e) =>{
    //     setTopic(e.target.value)
    // }
    const handleBlogContentChange = (e) =>{
        // setBlog(e.target.innerHTML)
        setBlog(blogRef.current.value)
    }

    const config = {
        readonly: false
    }


    var today = new Date()
    // var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate())
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear())
    const username = currentUser.displayName ? currentUser.displayName : currentUser.email
    const time = today.getTime().toString()

    let data = {
        blogId: time,
        postedByUid: currentUser.uid,
        postedByName: currentUser.displayName,
        postedByEmail: currentUser.email,
        postedByProfilePic: currentUser.photoURL,
        heading: heading,
        subHeading: subHeading,
        level: level,
        Bclass: Bclass,
        subject: subject,
        // topic: topic,
        blog: blog,
        datePosted: date
    }
    const rootRef = database.ref(`blogs`)
    // const allBlogPost = database.ref('/blogs' + blogToEdit.blogId)

    const handleSubmit = (e) => {
        e.preventDefault()

        database.ref('/blogs/' + data.blogId).set(data)
        .then(() =>{
            console.log("Uploaded blog to firebase successfully")
            alert("Article Posted Successfully")
            history.push('/')
        }).catch((e)=>{
            console.log(e)
        })

        console.log(data)

    }    

    return (
        <Container>
            <Header/> 

            <WritePostContainer>
                <form onSubmit={handleSubmit}>

                    <TitleInput>
                        <input type="text" placeholder="Blog Title" ref={headingRef} onChange={handleHeadingChange} required ></input>
                    </TitleInput>

                    <SubTitleInput>
                        <input type="text" placeholder="Blog SubTitle / Description" ref={subHeadingRef} onChange={handleSubHeadingChange} required></input>
                    </SubTitleInput>

                    <Horizontal>
                    <DropDown>
                        <BlogLevel> <p>BLOG TYPE</p>
                            <select value={level} onChange={handleLevelChange}>
                                <option value="Opinions">Opinions</option>
                                <option value="News">News</option>
                            </select>
                        </BlogLevel>

                          </DropDown>

                        
                    
                    </Horizontal>

                    

                    <BlogContent>
                        
                    <JoditEditor
                        ref={blogRef}
                        // value={blog}
                        placeholder={blog}
                        config={config}
                        onBlur={handleBlogContentChange}
            />
                    </BlogContent>

                    <PostButton>
                        <input className="submit" type="submit" value="submit"></input>
                    </PostButton>
                    </form>
            </WritePostContainer>
        </Container>
    )
}

const Container = styled.div`

`
const WritePostContainer = styled.div`
    border: 1px solid grey;
    margin: 30px;
    padding: 30px;
`
const TitleInput = styled.div`
    margin-bottom: 10px;

    input{
        width: 60%;
        font-size: 24px;
        padding: 5px;
        font-weight: bold;

        :focus{
        outline: none;
        }
    }
    
`
const SubTitleInput = styled.div`
    display: flex;

    input{
        width: 100%;
        font-size: 18px;

        :focus{
            outline: none;
        }
    } 
`
const Horizontal = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`
const DropDown = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    flex-wrap: wrap;
    margin: 10px 0;
`
const BlogLevel = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }
`
const BlogClass = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }
`
const BlogSubject = styled.div`
    display: flex;
    p{
        margin-right: 10px;
    }

    textarea{
        width: 100%;
    }
`
const BlogSubjectTopic = styled.div`
    display: flex;
    width: 40%;
    margin-left: 40px;
    p{
        margin-right: 10px;
    }
    input{
        width: 100%;
    }
`
const BlogContent = styled.div`
    overflow-y: scroll;
    display: flex;
    /* width: 100%; */
    /* height: 50vh; */
    /* border: 1px solid grey; */
        padding: 30px;


    ::-webkit-scrollbar{
        display: none;
    }

    textarea{
        width: 100%;
        bottom: 0;
        border: 1px solid grey;
        padding: 30px;

        :focus{
            outline: none;
        }
    }
`
const PostButton = styled.div`
    margin-top: 20px;
    text-align: center;
`