import ListItem from './ListItem'

export default ({ title, posts }) =>
  <div>
    {title}

    <ul>
      {posts.map(ListItem)}
    </ul>
  </div>
