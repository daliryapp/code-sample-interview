import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import {forwardRef, useImperativeHandle, useState} from "react";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const DrawerSidebar = forwardRef((props, ref) => {
    const [open, setOpen] = useState(null);
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    useImperativeHandle(ref, (...rest) => ({
        show(component: any) {
            setOpen(component);
        },
        hide() {
            setOpen(null);
        },
    }));
    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({...state, [anchor]: open});
            };


    return (
        <div>
            <Drawer
                anchor={'right'}
                open={!!open}
                // dir={"rtl"}
                onClose={() => setOpen(null)}
                variant={"temporary"}
                sx={{
                    '& .MuiDrawer-paper': {
                        '::-webkit-scrollbar': {
                            width: 4
                        },
                        /* Track */
                        '::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                        },
                        /* Handle */
                        '::-webkit-scrollbar-thumb': {
                            background: '#aaa',
                            borderRadius: 12,
                        },
                        /* Handle on hover */
                        '::-webkit-scrollbar-thumb:hover': {
                            background: '#888',
                        }
                    },
                    '& .MuiDrawer-paperAnchorLeft': {
                        // right: '0 !important',
                        // left: 'unset !important',
                        minWidth: '195px'
                    }
                }}
            >
                <Box>{open && open}</Box>
            </Drawer>
        </div>
    );
});
// @ts-ignore
DrawerSidebar.displayName = "DrawerSidebar";
export default DrawerSidebar;