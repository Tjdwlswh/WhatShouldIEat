import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {readPost, unloadPost} from '../../modules/recipe'
import MyRecipeForm from "../../components/main/myrecipe/MyRecipeForm";

const MyRecipeContainer = () => {
    const {postId} = useParams();
    
    const dispatch = useDispatch()
    const {post, error, loading,token} = useSelector(({post, loading,user})=>({
        post : post.post,
        error : post.error,
        loading : loading['post/READ_POST'],
        token : user.token
    }))
    const recipeId = postId
    
    console.log(token)
    console.log(recipeId)
    useEffect(()=>{
        dispatch(readPost({ recipeId, token}))

        return () => {
            dispatch(unloadPost())
        }
    },[dispatch, recipeId,token])

    return <MyRecipeForm post={post} loading={loading} error={error} />
}

export default MyRecipeContainer;