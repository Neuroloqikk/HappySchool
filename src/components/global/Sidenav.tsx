import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/Dashboard';
import MagicIcon from '@rsuite/icons/UserChange';
import SettingsIcon from '@rsuite/icons/SiteSetting';
import { useState } from 'react';
import "rsuite/dist/rsuite.css";
import { Link } from 'react-router-dom';

function Sidebar() {
    const [activeKey, setActiveKey] = useState('1');
    return (
        <div className="sidenav">
            <Sidenav expanded={true} defaultOpenKeys={['2']}>
                <Sidenav.Body>
                    <Nav activeKey={activeKey} onSelect={setActiveKey}>
                        <Nav.Item eventKey="1" as={Link} to="/" icon={<DashboardIcon />}>
                            Dashboard
                        </Nav.Item>
                        <Nav.Menu placement="rightStart" eventKey="2" title="Presenças" icon={<MagicIcon />}>
                            <Nav.Item eventKey="2-1" as={Link} to="/presencas/diarias">Diárias</Nav.Item>
                            <Nav.Item eventKey="2-2" as={Link} to="/presencas/mensais">Mensais</Nav.Item>
                        </Nav.Menu>
                        <Nav.Menu placement="rightStart" eventKey="3" title="Backoffice" icon={<SettingsIcon />}>
                            <Nav.Item eventKey="3-1" as={Link} to="/backoffice/alunos">Alunos</Nav.Item>
                            <Nav.Item eventKey="3-2">Turma</Nav.Item>
                            <Nav.Item eventKey="3-3">Regras</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
    );
};

export default Sidebar;