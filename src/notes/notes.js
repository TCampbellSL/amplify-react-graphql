import React, { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Image,
  Text,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { getUrl, remove } from "aws-amplify/storage";
import { listNotes } from ".././graphql/queries";
import {
  deleteNote as deleteNoteMutation,
  updateNote as updateNoteMutation,
} from ".././graphql/mutations";
import { FaPencilAlt } from "react-icons/fa";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const client = generateClient();
  useEffect(() => {
    fetchNotes();
  }, []);

  const updateNote = {
    id: "asd",
    name: "TC",
    description: "word",
  };

  async function fetchNotes() {
    const apiData = await client.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await getUrl({ key: note.id });
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function editNote(id) {
    console.log(id.description);
    await client.graphql({
      query: updateNoteMutation,
      variables: { input: updateNote },
    });
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await remove({ key: id });
    await client.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Flex
          key={note.id || note.name}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Text as="strong" fontWeight={700}>
            {note.name}
          </Text>
          <Text as="span">{note.description}</Text>
          {note.image && (
            <Image
              src={note.image.url.href}
              alt={`visual aid for ${note.name}`}
              style={{ width: 400 }}
            />
          )}
          <Button variation="link" onClick={() => deleteNote(note)}>
            Delete note
          </Button>
          <Button variation="link" onClick={() => editNote(note)}>
            <FaPencilAlt />
          </Button>
        </Flex>
      ))}
    </View>
  );
};

export default withAuthenticator(Notes);
