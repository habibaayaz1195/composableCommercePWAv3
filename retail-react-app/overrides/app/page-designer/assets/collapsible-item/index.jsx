/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Text
} from '@salesforce/retail-react-app/app/components/shared/ui'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel
} from '@chakra-ui/react'

import { AddIcon, MinusIcon, IconButton } from '@chakra-ui/icons';

/**
 * Collapsible Item component
 *
 * @param {object} props
 * @param {string} - props.accordionDetail - Accordion Description.
 * @param {string} - props.accodionItem - Accordion Title.
 * @returns {React.ReactElement} - CollapsibleItem component.
 */
export const CollapsibleItem = ({ accodionItem, accordionDetail }) => {
    //Accordion Component fields
    const accodion_Item = accodionItem
    const accordion_Detail = accordionDetail

    return (
        <Box className={'collapsible-item'} maxW='730px' w='100%' mx='auto' px={4}>
            <Accordion allowToggle>
                <AccordionItem
                    border="1px solid #ddd"
                    p="30px 40px 25px"
                    marginTop={"25px"}
                >
                    {({ isExpanded }) => (
                        <>
                            <AccordionButton p={0} display={'flex'} alignItems={'flex-start'} data-testid="accordion-button" role='accordion-button'>
                                {accodion_Item && (
                                    <Box flex='1' textAlign='left' color="acimaDefault.2" fontWeight='700' fontSize="24px" order="1"
                                        dangerouslySetInnerHTML={{
                                        __html: accodion_Item
                                        }}
                                    />
                                )}

                                {isExpanded ? (
                                    <IconButton minW={'30px'} height={'30px'} marginRight={'20px'} marginTop={'5px'} icon={<MinusIcon />} bg="acimaDefault.1" aria-label="Expand item" isRound order={0} _hover={{ bg: 'acimaDefault.1' }}/>
                                ) : (
                                    <IconButton minW={'30px'} height={'30px'} marginRight={'20px'} marginTop={'5px'} icon={<AddIcon />} bg="acimaDefault.1" aria-label="Collapse item" isRound order={0} _hover={{ bg: 'acimaDefault.1' }} />
                                )}
                            </AccordionButton>

                            <AccordionPanel px={8} pt={"30px"}>
                                {accordion_Detail && (
                                    <Text as="p" mb={4} className={'content-text'} color={'acimaDefault.4'}
                                        dangerouslySetInnerHTML={{
                                            __html: accordion_Detail
                                        }}
                                    />
                                )}
                            </AccordionPanel>
                        </>
                    )}
                </AccordionItem>
            </Accordion>
        </Box>
    )
}

export default CollapsibleItem
