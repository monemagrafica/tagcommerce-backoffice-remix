import {
  useState,
  useEffect,
  type FC,
  type SetStateAction,
  type Dispatch,
} from "react";
import { WithContext as ReactTags } from "react-tag-input";

type Props = {
  setFieldAttributes: Dispatch<SetStateAction<[]>>;
};
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagFieldManager: FC<Props> = ({ setFieldAttributes }) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    setFieldAttributes(tags);
  }, [tags]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

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
  );
};
export default TagFieldManager;
