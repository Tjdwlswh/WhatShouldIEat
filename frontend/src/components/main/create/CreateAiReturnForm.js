
import Button from '../../common/Button';
import React, {useState, useCallback} from 'react'
import { CreateAireturnBlock, ImgUpload, AiReturnbox, Tag, TagBoxBlock,TagForm,TagListBlock,} from './AiComponents';
 

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



const CreateAiReturnForm = () => {

    const [input, setInput] = useState('')
    const [localTags, setLocalTags] = useState([])
    
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

    return(
        <CreateAireturnBlock>
            <ImgUpload>
            <img className='imgbox' src='/logo.png' alt='AI 사진' />
            <Button className="onebtn">이미지 업로드</Button>
            </ImgUpload>
            <AiReturnbox>
                <h3>요리명</h3>
                <label className='divbox'>
                <input placeholder='재료들' className='one' contentEditable="true"></input>
                <input placeholder='레시피' className='two' contentEditable="true"></input>

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
    )
}

export default CreateAiReturnForm;