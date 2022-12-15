import { useState } from "react"
import { WithContext as ReactTags } from "react-tag-input"

const KeyCodes = {
  comma: 188,
  enter: 13,
}

const delimiters = [KeyCodes.comma, KeyCodes.enter]

const TagFieldManager = () => {
  const [tags, setTags] = useState([])

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i))
  }

  const handleAddition = (tag) => {
    setTags([...tags, tag])
  }

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked")
  }
  console.log(tags)
  return (
    <div className="app">
      <div>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
    </div>
  )
}
export default TagFieldManager
