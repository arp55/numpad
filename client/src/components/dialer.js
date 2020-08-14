import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

//import material-ui components
import Card from '@material-ui/core/Card';
import { Button, TextField } from '@material-ui/core';

//import material icon
import BackspaceIcon from '@material-ui/icons/Backspace';

//write styles for components
const useStyles = makeStyles({
    root: {
        marginTop: 50,
    },
    card: {
        width: 300,
        margin: 'auto',
        padding: 10
    },
    btn: {
        display: 'inline-block',
        width: 74,
        borderRadius: 0
    },
    text: {
        margin: '4px 0px',
        fontWeight: 600
    },
    textField: {
        margin: 9,
        width: 222
    },
    icon: {
        color: '#a6a6ad',
        fontSize: 40,
        position: "absolute",
        right: 15,
        top: 18,
        cursor: 'pointer'
    },
    name: {
        fontWeight: 600,
        color: '#1b527e',
        fontSize: 20,
        margin: 6
    },
    invalid: {
        color: 'red',
        fontWeight: 600,
        fontSize: 20,
    }
});


export default function Dial() {
    //set variable for material styles
    const classes = useStyles();
    //assign various states
    const [state, setstate] = useState({
        code: '',
        1: ["@.?"],
        2: ['ABC'],
        3: ['DEF'],
        4: ['GHI'],
        5: ['JKL'],
        6: ['MNO'],
        7: ['PQRS'],
        8: ['TUV'],
        9: ['WXYZ'],
        result: ''
    })
    //set variable for iterating and displaying nums
    const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])

    //handle button clicks
    const handleClick = val => {
        if (val === "spc") {
            setstate({ ...state, code: state.code + ' ' })
        } else if (val === "del") {
            let str = state.code.slice(0, -1);
            setstate({ ...state, code: str })
        } else {
            setstate({ ...state, code: state.code + val })
        }
    }

    //Api call
    const handleSubmit = async () => {
        const { code } = state;
        let pat = /\s/g;
        if (code.charAt(1).match(pat) && code.charAt(0) === "0") {
            fetch('http://localhost:5002/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            }).then((res) => {
                res.json().then(function (data) {
                    setstate({ ...state, result: data, code: '' })
                });
            })
                .catch(err => console.log(err))
        }
        else {
            setstate({ ...state, result: { name: "Invalid Code" }, code: '' })
        }

    }

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <span style={{ position: 'relative' }}>
                    <TextField className={classes.textField} variant="outlined" value={state.code} disabled={true} />
                    <BackspaceIcon className={classes.icon} onClick={() => handleClick('del')} />
                </span>
                <br />
                {numbers.map(res => {
                    return (
                        res % 3 === 0 ?
                            <span key={res}>
                                <Button variant="outlined" className={classes.btn} onClick={() => handleClick(res)}>
                                    <p className={classes.text}>{res}</p>
                                    <p className={classes.text}>{state[res]}</p>
                                </Button>
                                <br />
                            </span>
                            :
                            <Button variant="outlined" className={classes.btn} onClick={() => handleClick(res)} key={res}>
                                <p className={classes.text}>{res}</p>
                                <p className={classes.text}>{state[res]}</p>
                            </Button>
                    )
                })}
                <Button className={classes.btn} onClick={() => handleSubmit()}>
                    <p className={classes.text}>*</p>
                    <p className={classes.text}>send</p>
                </Button>
                <Button variant="outlined" className={classes.btn} onClick={() => handleClick('0')} >
                    <p className={classes.text}>0</p>
                    <p className={classes.text}>Zero</p>
                </Button>
                <Button className={classes.btn} onClick={() => handleClick('spc')}>
                    <p className={classes.text}>#</p>
                    <p className={classes.text}>space</p>
                </Button>
                {state.result.found && state.result.name.length > 0 ?
                    <>
                        <p style={{ margin: '10px 0px 5px 0px' }}>You have called</p>
                        {state.result.name.map((res, index) => (
                            <p className={classes.name} key={index}>{res}</p>
                        ))
                        }
                    </>
                    :
                    <p className={classes.invalid}>{state.result.name}</p>
                }
            </Card>
        </div>
    )
}
