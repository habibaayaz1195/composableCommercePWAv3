import React, { useEffect } from "react";
import { Box, Button } from "@chakra-ui/react";
import { Region } from "@salesforce/commerce-sdk-react/components";

export const TabItem = ({ tabTitle, regions }) => {
    useEffect(() => {
        const buttons = document.querySelectorAll(".tabItemBtns");

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                buttons.forEach((btn) => btn.classList.remove("active")); // Remove from all
                button.classList.toggle("active"); // Toggle active class
            });
        });

         // Automatically trigger a click on the first button after 4 seconds
        const timeout = setTimeout(() => {
            const activeButton = Array.from(buttons).find((btn) =>
                btn.classList.contains("active")
            );

            if (activeButton) {
                activeButton.click();
            }
        }, 4000);

        return () => {
            clearTimeout(timeout)
            // Cleanup event listeners when component unmounts
            buttons.forEach((button) =>
                button.removeEventListener("click", () => {})
            );
        };
    }, []);

    return (
        <Box className="tabsDataWrapper">
            {/* Button remains visible at all times */}
            <Box className="tabsBtnHolder">
                <Button className={'tabItemBtns'}>{tabTitle}</Button>
            </Box>

            {/* Toggle only the tab content */}
            <Box className="tab-content-region" display={'none'}>
                {regions.map((region) => (
                    <Region key={region.id} region={region} />
                ))}
            </Box>
        </Box>
    );
};

export default TabItem;
