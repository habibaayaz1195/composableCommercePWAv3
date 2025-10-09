import React, { useEffect, useState } from 'react'
import { useCategory } from '@salesforce/commerce-sdk-react'
import {
    Box,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerCloseButton,
    useDisclosure,
    Button,
    useBreakpointValue,
    Spinner,
    Flex
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const ListMenu = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const isMobile = useBreakpointValue({ base: true, md: false })

    const { data: categoriesData } = useCategory({
        parameters: { id: 'root' }
    })

    useEffect(() => {
        if (categoriesData?.categories) {
            setCategories(categoriesData.categories)
            setLoading(false)
        }
    }, [categoriesData])

    console.log("categories", categoriesData)

    if (loading) {
        return (
            <Flex justify="center" align="center" py={6}>
                <Spinner size="lg" />
            </Flex>
        )
    }

    // --- MOBILE (Drawer menu) ---
    if (isMobile) {
        return (
            <Box>
                <Button onClick={onOpen} colorScheme="teal" size="sm">
                    Menu
                </Button>

                <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px">
                            Categories
                        </DrawerHeader>
                        <DrawerBody>
                            <Box as="ul" listStyleType="none" p={0} m={0}>
                                {categories.map((cat) => (
                                    <Box as="li" key={cat.id} py={2}>
                                        <Link
                                            to={`/category/${cat.id}`}
                                            onClick={onClose}
                                            style={{
                                                color: '#2d3748',
                                                textDecoration: 'none',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {cat.name}
                                        </Link>
                                    </Box>
                                ))}
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>
        )
    }

    // --- DESKTOP (Horizontal nav) ---
    return (
        <Box
            as="nav"
            bg="#f9f9f9"
            px={6}
            py={3}
            borderBottom="1px solid #e2e8f0"
        >
            <Box
                as="ul"
                display="flex"
                gap={8}
                listStyleType="none"
                m={0}
                p={0}
                justifyContent="center"
            >
                {categories.map((cat) => (
                    <Box as="li" key={cat.id}>
                        <Link
                            to={`/category/${cat.id}`}
                            style={{
                                color: '#2d3748',
                                fontWeight: '500',
                                textDecoration: 'none'
                            }}
                        >
                            {cat.name}
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default ListMenu
