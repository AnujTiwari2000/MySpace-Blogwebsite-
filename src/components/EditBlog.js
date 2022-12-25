import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Header from './Header'
import { useHistory } from 'react-router-dom'

import JoditEditor from 'jodit-react'


import { database } from '../firebase';

import { useAuth } from '../contexts/AuthContext'

export default function EditBlog() {

    const blogRetrieved = localStorage.getItem('blog')
    const blogToEdit = JSON.parse(blogRetrieved)

    const [heading, setHeading] = useState("")
    const [subHeading, setSubHeading] = useState("")
    // const [topic, setTopic] = useState("")
    const [level, setLevel] = useState("Opinions")
    const [subject, setSubject] = useState("maths")
    const [Bclass, setClass] = useState("class 1")
    const [blog, setBlog] = useState("")

    const headingRef = useRef()
    const subHeadingRef = useRef()
    // const topicRef = useRef()
    const blogRef = useRef()

    const history = useHistory()

    const config = {
        readonly: false
    }
    
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
        setBlog(blogRef.current.value)
    }
    var today = new Date()
    // var date = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDate())
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + (today.getFullYear())
    const username = currentUser.displayName ? currentUser.displayName : currentUser.email
    const time = today.getTime()

    let data = {
        blogId: blogToEdit.blogId,
        postedByUid: currentUser.uid,
        postedByName: username,
        postedByProfilePic: currentUser.photoURL,
        heading: heading ? heading : blogToEdit.heading,
        subHeading: subHeading ? subHeading : blogToEdit.subHeading,
        level: level ? level : blogToEdit.level,
        Bclass: Bclass ? Bclass : blogToEdit.Bclass,
        subject: subject ? subject : blogToEdit.subject,
        // topic: topic ? topic : blogToEdit.topic,
        blog: blog ? blog : blogToEdit.blog,
        datePosted: date
    }
    const allBlogPost = database.ref('/blogs')
    // const allBlogPost = database.ref(`/blogs`).orderByChild(`${blogToEdit.blogId}`).equalTo(blogToEdit.blogId)
    // const storing = database.ref(`/blogs`).orderByChild('postedByUid').equalTo(currentUser.uid)

    const handleSubmit = (e) => {
        e.preventDefault()

        allBlogPost.child(blogToEdit.blogId).update(data)
        .then(() =>{
            console.log("Uploaded blog to firebase successfully")
            alert("Article Posted Successfully")
            history.push('/myBlogs')
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
                        <input type="text" defaultValue={blogToEdit.heading} ref={headingRef} onChange={handleHeadingChange} required ></input>
                    </TitleInput>

                    <SubTitleInput>
                        <input type="text" placeholder="Blog SubTitle/Description" defaultValue={blogToEdit.subHeading} ref={subHeadingRef} onChange={handleSubHeadingChange} required></input>
                    </SubTitleInput>

                    <Horizontal>
                    <DropDown>
                        <BlogLevel> <p>Blog Type</p>
                            <select value={blogToEdit.level} onChange={handleLevelChange}>
                                <option value="Opinions">Opinions</option>
                                <option value="News">News</option>
                            </select>
                        </BlogLevel>

                    

                    
                        </DropDown>

                      
                    
                    </Horizontal>

                    
                    <BlogContent>
                        
                        <JoditEditor
                            ref={blogRef}
                            value={blogToEdit.blog}
                            placeholder={blogToEdit.blog}
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
    /* width: 100%; */
    /* border: 1px solid grey; */
    /* display: flex;
    justify-content: center; */
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
    /* border: 1px solid grey; */
`
const DropDown = styled.div`
    display: flex;
    /* border: 1px solid grey; */
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