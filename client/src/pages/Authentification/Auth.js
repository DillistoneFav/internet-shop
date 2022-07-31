import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import Card from 'react-bootstrap/esm/Card';
import classes from './Auth.module.css';
import Button from 'react-bootstrap/esm/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    return (
        <Container 
            className={`${classes.Cont} d-flex justify-content-center align-items-center`}
            style={{height: window.innerHeight - 70}}
            >
            <Card className={classes.border}>
                <h2 className="m-auto">{isLogin ? 'Authorization' : 'Registration'}</h2>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-3" placeholder="login"></Form.Control>
                    <Form.Control className="mt-3" placeholder="password"></Form.Control>
                        <Button className="mt-3" variant={"primary"}>
                            {isLogin ? 'Log in' : 'Registration'}
                        </Button>
                        {isLogin ? 
                            <div className={classes.regZone}>
                                Have not an account yet?
                                <NavLink className={classes.regLink} to={REGISTRATION_ROUTE}>Registration</NavLink>
                            </div>
                            :
                            <div className={classes.regZone}>
                                Already have an account?
                                <NavLink className={classes.regLink} to={LOGIN_ROUTE}>Log in</NavLink>
                            </div>
                        }
                </Form>
            </Card>
            
        </Container>
    );
};

export default Auth;