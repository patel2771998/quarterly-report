import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    Box, Button, Typography, useMediaQuery, Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
} from '@mui/material';
import { connect } from 'react-redux';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Lock as LockIcon } from '../icons/lock';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { Types } from '../constants/actionTypes';
const items = [
    {
        href: '/',
        icon: (<LockIcon fontSize="small" />),
        title: 'Login'
    },
    {
        href: '/register',
        icon: (<UserAddIcon fontSize="small" />),
        title: 'Register'
    },
];

const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });
    const [barItem, setBarItem] = useState(items);
    const [isLogoutOpen, setLogoutOpen] = useState(false);

    useEffect(
        () => {
            if (!router.isReady) {
                return;
            }

            if (open) {
                onClose?.();
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.asPath]
    );

    useEffect(() => {
        if (!!props.profile && !!props.profile.user_name) {
            let newBarItem = barItem;
            newBarItem = newBarItem.filter(item => !(item.title == 'Login' || item.title == 'Register'));
            setBarItem(newBarItem)
        } else {
            setBarItem(items)
        }
    }, [props.profile])

    return (
        <>
            <AppBar position="static" color="inherit">
                <Toolbar>

                    <Box sx={{ flexGrow: 1 }}>
                        <NextLink
                            href="/"
                            passHref
                        >
                            <a>
                                <img
                                    style={{
                                        height: 30,
                                        width: 30
                                    }}
                                    src="/static/images//logo.png" />
                            </a>
                        </NextLink>
                    </Box>
                    <Button color="inherit"
                        onClick={() => {
                            router.push('/');
                        }}>Home</Button>
                    {props.profile.token == undefined ?
                        <Button color="inherit"
                            onClick={() => {
                                router.push('/login');
                            }}>Login/Register</Button> :
                        <Button color="inherit"
                            onClick={() => {
                                setLogoutOpen(true)
                            }}>Logout</Button>}
                    <Dialog
                        open={isLogoutOpen}>
                        <DialogTitle>
                            Logout
                        </DialogTitle>
                        <DialogContent>
                            <Typography gutterBottom>
                                Are you sure you want to logout?
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    setLogoutOpen(false)
                                }}>
                                No
                            </Button>
                            <Button
                                variant="contained"
                                autoFocus
                                onClick={() => {
                                    var profile = {
                                        name: '',
                                        username: '',
                                        account: [],
                                        email: ''
                                    };
                                    props.save_user_data({ user: profile })
                                    router.push('/');
                                    setLogoutOpen(false)
                                    toast.success('Logout Successfully!')
                                }}>
                                Yes
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Toolbar>
            </AppBar>
        </>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardSidebar);