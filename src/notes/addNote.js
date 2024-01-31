import React, { useState, useEffect } from "react";
import "./addNote.css";
import { createNote as createNoteMutation } from "../graphql/mutations";
import { uploadData, getUrl } from "aws-amplify/storage";
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { generateClient } from "aws-amplify/api";
import { listNotes } from ".././graphql/queries";

export default function AddNote() {
  const [notes, setNotes] = useState([]);
  const client = generateClient();
  useEffect(() => {
    fetchNotes();
  }, []);

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

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    const result = await client.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    if (!!data.image)
      await uploadData({ key: result.data.createNote.id, data: image }).result;
    fetchNotes();
    event.target.reset();
  }
  return (
    <div>
      <h1>Add New Note</h1>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
    </div>
  );
}
