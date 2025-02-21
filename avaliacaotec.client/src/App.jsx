import './App.css';
import AlunosList from './Components/AlunoComponents/AlunoListComponent';
import CursoListComponent from './Components/CursoComponents/CursoListComponent';
import MatriculaListComponent from './Components/MatriculaComponents/MatriculaListComponent';
import NavBarComponent from './Components/NavBarComponent';


function App() {

    return (
        <div>
            <NavBarComponent />
            <AlunosList />
            <CursoListComponent/>
            <MatriculaListComponent/>
           
        </div>
    );
    
}

export default App;