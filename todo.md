- [x] minimize material ui bundle size: https://material-ui.com/guides/minimizing-bundle-size/#option-2

## fix divider

- [x] get proper border effects using panel component alone
- [x] make redux variables sidebarWidth, viewPanelWidth
- [x] move divider to outside flexbox, position absolutely, dragging uses reducers...
- [x] visual effects on divider drag (toggle visibility, color transitions)

## API setup

- [ ] add new users to default server

### routes

- fetch initial data:
- [ ] users servers ->
- [ ] servers channels ->
- [ ] check last messages read / last message posted,
- [ ] user info,
- other routes
- [ ] info on other users (status, names...) => AS NEEDED
- channel creation
- [x] -> backend
- [ ] -> frontend
- server creation
- [x] -> backend
- [ ] -> frontend

### socket events

events that require notifying other users

> some are emitted by client, some are result of client hitting a route, and route calling socket event

- [ ] message received in channel i have access to
- [ ] server made ACTIVE SERVER by client ( become listener )
- [ ] user joined server
- [ ] channel created / deleted -> called by route...
- [ ] message edited
- [ ] message deleted

# frontend

- add server menu
- [x] dark backgroud modal looking menu
- [x] menu name,
- [x] menu close button
- [x] menu description
- [x] menu form,
- [x] button that's greyed out if invalid entry

- [ ] isPrivate toggle, (channel creation)
