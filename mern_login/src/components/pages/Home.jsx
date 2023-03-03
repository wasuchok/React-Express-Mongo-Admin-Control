import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const Home = () => {
  return (
    <>
    
    <Container maxWidth="xl" sx={{ p:2 }}>
    <div>Home Page</div>
    <Button variant="contained">Hello World</Button>
    </Container>
    </>
  )
}

export default Home