"use client"
import { Card, Text, Button, Group, Avatar, Tooltip, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconAt, IconPhoneCall, IconWorld, IconUserPlus, IconUserMinus, IconTrash, IconStarFilled } from '@tabler/icons-react';

// Defining TypeScript interface for the structure of each user object
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  followed: boolean;

}

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users data when the component mounts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then((data: User[]) => {
        // Initialize the followed property for each user to false
        const usersWithFollow = data.map(user => ({ ...user, followed: false }));
        setUsers(usersWithFollow);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle user deletion
  const handleDelete = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  }

  // unction to handle follow
  const handleFollow = (id: number) => {
    // Toggle the follow state for the user with the specified id
    setUsers(users.map(user => {
      if (user.id === id) {
        return { ...user, followed: !user.followed }; // Toggle follow state
      }
      return user;
    }));
  }

  return (

    <Flex wrap="wrap" >

      {/* // <div style={{ display: "flex", flexWrap: "wrap" }}> */}
      {users.map((user) => (
        <Card shadow="sm" padding="sm" radius="md" withBorder key={user.id} style={{ width: "300px", height: "350px", margin: "1rem" }}>
          <Card.Section style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
            <Tooltip label={user.name} withArrow>
              <Avatar src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt={user.name} color="red" size="xl" />
            </Tooltip>
          </Card.Section>
          <Group justify="center" mt="md" mb="xs">
            <Text fw={500}>{user.name}</Text>
            {user.followed && <Text style={{ color: 'gold', marginLeft: 1 }} size="xs"><IconStarFilled /></Text>} {/* Render golden star icon if profile is followed */}
          </Group>
          <Group mt="md" display="block">
            <Flex mb="xs" align="center">
              <IconAt height={16} width={16} stroke={1} />
              <Text pl="xs" fz="xs"  >{user.email}</Text>
            </Flex>
            <Flex mb="xs" align="center">
              <IconPhoneCall height={16} width={16} stroke={1} />
              <Text pl="xs" fz="xs"  >{user.phone}</Text>
            </Flex>
            <Flex mb="xs" align="center">
              <IconWorld height={16} width={16} stroke={1} />
              <Text pl="xs" fz="xs"  >{user.website}</Text>
            </Flex>
          </Group>
          <Group justify='center'>

            {user.followed ? (
              <>
                <Button color="blue" mt="md" variant='outline' style={{ width: 140 }} leftSection={<IconUserMinus stroke={1} />}
                  radius="md" onClick={() => handleFollow(user.id)}>
                  Unfollow
                </Button>
              </>
            ) : (
              <>
                <Button color="blue" mt="md" variant='filled' style={{ width: 140 }} leftSection={<IconUserPlus stroke={1} />} radius="md" onClick={() => handleFollow(user.id)}>
                  Follow
                </Button>
              </>
            )}
            <Button color="blue" mt="md" variant='outline' radius="md" onClick={() => handleDelete(user.id)}>
              <IconTrash stroke={1} />
              Delete
            </Button>
          </Group>
        </Card>
      ))
      }

      {/* </div > */}
    </Flex>
  );
}
