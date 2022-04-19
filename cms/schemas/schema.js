// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Define the schema types inline here
// - TODO: this should really be pulled out elsewhere
const Post = {
  title: 'Post',  // The human-readable label. Used in the studio.
  name: 'post',   // Required. The field name, and key in the data record.
  type: 'document',  // Required. The name of any valid schema type.
  // Input fields below, as many as you need.
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Date',
      name: 'date',
      type: 'date',
    },
    {
      title: 'Location',
      name: 'location',
      type: 'string',
    },
    {
      title: 'Content',
      name: 'content',
      type: 'array',
      of: [{
        title: 'block',
        type: 'object',
        fields: [{
          title: 'Text',
          name: 'text',
          type: 'string'
        }]
      },{
        type: 'image'
      }]
    }
  ]
}
// {
//   title: 'Authors',
//   name: 'authors',
//   type: 'array',
//   of: [{
//     type: 'reference',
//     to: [{type: 'person'}]
//   }]
// }


// TODO: how to handle OG images...

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    Post
  ]),
})
