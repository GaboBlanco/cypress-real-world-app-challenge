class SideNavComponent {
    elements = {
        getNavigationItems: () => cy.get('[data-test="sidenav"] a'),
        getUserFullName: () => cy.get('[data-test="sidenav-user-full-name"]'),
    }

    /**
     * It navigates to the navigation item with the specified text
     * @param page Navigation item
     */
    navigateTo(page: string) {
        this.elements.getNavigationItems().contains(page).click();
    }
}

export const SideNav = new SideNavComponent();