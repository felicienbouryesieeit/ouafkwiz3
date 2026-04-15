import React, { useRef } from 'react';
import './Comments.css';

interface Comment {
  comment: string;
    id: number;
    created_at : string;
    name : string;
}

const Comments = ({createcomment,getcomments,get_token}:{createcomment: (local_comment : string) => void,getcomments:()=> Comment[],get_token: () => string}) => {
  const formcomment : any = useRef('');
  React
  const sendcomment = (e:any) => {
    e.preventDefault();
    const formcommentdata = new FormData(formcomment.current);
    const local_comment = String(formcommentdata.get('message')); 
    createcomment(local_comment);
  };

  const get_date = (dateString : string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); /* + ' oui ' + date.toLocaleTimeString() */
  }

    const isconnected = () => {
    const token2 = get_token();
    //console.log(JSON.parse(token2)); //.user.user_metadata.first_name
    let isconnectedbool : boolean = false;
    if (token2) {
      console.log(JSON.parse(token2).user.user_metadata.first_name); //.user.user_metadata.first_name
      isconnectedbool = true;
    }
    return isconnectedbool;
  }






  return (
   
       <div>
      

    
    
      <div className='comment-container'>

      {isconnected() && (
        <form ref={formcomment} onSubmit={sendcomment}>
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>)}
    
      {getcomments().map(comment => (
        <div  className='comment' key={comment.id}>
          <div>{comment.name+' :'}  </div>
          <div>{comment.comment}  </div>
          <div>{get_date(comment.created_at)}  </div>
        </div>
      ))}
      </div>
    

    </div>
  );
};

export default Comments;

/*



*/