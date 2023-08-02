
import Button from '../../common/Button';
import React, {useState, useCallback,useEffect} from 'react'
import { CreateAireturnBlock, ImgUpload, AiReturnbox, Tag, TagBoxBlock,TagForm,TagListBlock,} from './AiComponents';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { readAiPost,unloadPost } from '../../../modules/aipost';
import Responsive from '../../common/Responsive';
import styled from 'styled-components';


export const TagItem = React.memo(({tag, onRemove})=>(
    <Tag onClick={() => onRemove(tag)}> #{tag} </Tag>
))

export const TagList = React.memo(({tags, onRemove}) => (
    <TagListBlock>
        {tags.map(tag => (
            <TagItem key={tag} tag={tag} onRemove={onRemove} />
        ))}
    </TagListBlock>
))

const AiPostViewerBlock = styled(Responsive)`
margin-top : 4rem;`


const CreateAiReturnForm = () => {
    const [input, setInput] = useState('')
    const [localTags, setLocalTags] = useState([])
    const {postId} = useParams();
    const dispatch = useDispatch();
    const {aipost, error, loading} = useSelector(({aipost, loading}) => ({
        aipost: aipost.aipost,
        error: aipost.error,
        loading : loading['aipost/READ_AIPOST'],
    }))

    useEffect(() => {
        dispatch(readAiPost(postId))

        return () => {
            dispatch(unloadPost)
        }
    },[dispatch,postId])

    const insertTag = useCallback(
        tag => {
            if (!tag) return;
            if (localTags.includes(tag)) return;
            setLocalTags([...localTags, tag])
        },
        [localTags],
    )

    const onRemove = useCallback(
        tag => {
            setLocalTags(localTags.filter(t=>t !== tag))
        },
        [localTags]
    )

    const onChange = useCallback(e => {
        setInput(e.target.value)
    })

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            insertTag(input.trim());
            setInput('')
        },
        [input, insertTag]
    )

    // if(error) {
    //     if (error.response && error.response.status === 404) {
    //         return <AiPostViewerBlock>AI가 작동을 안해요</AiPostViewerBlock>
    //     }
    //     return <AiPostViewerBlock>오류가 발생했습ㄴ</AiPostViewerBlock>
    // }
     
    // if(loading || !aipost) {
    //     return null;
    // }

    // const { foodname, ingredients, recipe } = aipost


    return(
        <>
        <CreateAireturnBlock>
            <ImgUpload>
            <img className='imgbox' src='/logo.png' alt='AI 사진' />
            <Button className="onebtn">이미지 업로드</Button>
            </ImgUpload>

            <AiReturnbox>
                <h3 contentEditable="true">여기는 'foodname'</h3>
                <label className='divbox'>
                <div className='one' contentEditable="true">여기는 'ingredients'</div>
                <div className='two' contentEditable="true">여기는 'recipe'</div>

                <TagBoxBlock>
                <div className='three'>
                <TagList tags={localTags} onRemove={onRemove} />
                </div>
                <TagForm onSubmit={onSubmit}>
                <input 
                placeholder='태그를 입력하세요'
                value={input}
                onChange={onChange}
                />
                <button type="submit">추가</button>
                </TagForm>
                </TagBoxBlock>
                </label>
                <div className='twobtn'>

                <Button>나의 레시피로 저장</Button>
                </div>
            </AiReturnbox>
        </CreateAireturnBlock>

        </>
    )
}

export default CreateAiReturnForm;