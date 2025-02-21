import { Link } from 'react-router-dom';

function SideBarComponent() {
  return (
      <div style={{ width: '200px', backgroundColor: '#f4f4f4', padding: '1rem' }}>
          <ul>
              <li><Link to="/alunos">Alunos</Link></li>
              <li><Link to="/cursos">Cursos</Link></li>
              <li><Link to="/matriculas">Matrículas</Link></li>
          </ul>
      </div>
  );
}

export default SideBarComponent;