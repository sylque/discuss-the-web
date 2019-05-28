import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/CheckCircleOutlined'
import WarningIcon from '@material-ui/icons/Error'
import DeleteIcon from '@material-ui/icons/DeleteOutlined' // Close
import Tooltip from '@material-ui/core/Tooltip'
import Badge from '@material-ui/core/Badge'

import { withDcs } from 'dcs-react-router-sync'
import Link from './Link'

import { Websites } from '../../collections/Websites'

//------------------------------------------------------------------------------

const text =
  `This url won't display correctly, unless you disable your browser ` +
  `anti-iframe protection. Click the "?" button on the right ` +
  `to know more.`

//------------------------------------------------------------------------------

// See https://codesandbox.io/s/xo0mmyv2oo
const styles = {
  iconButton: {
    visibility: 'hidden',
    '&:hover': {
      visibility: 'inherit'
    }
  },
  listItemSecondaryAction: {
    '&:hover > $iconButton': {
      visibility: 'inherit'
    },
    '@media (hover: none)': {
      display: 'none' // Can delete only if device as mouse/hover feature
    }
  },
  text: {
    wordBreak: 'break-all'
  }
  /*
  listItem: {
    '&:hover > $listItemSecondaryAction': {
      visibility: 'inherit'
    }
  }
  */
}

//------------------------------------------------------------------------------

const Line = withStyles(styles)(props => {
  const { path, website, selected, classes, dcsCount } = props

  const icon = website.iframeIssue ? (
    <Tooltip title={text} placement="left-start">
      <ListItemIcon>
        <WarningIcon />
      </ListItemIcon>
    </Tooltip>
  ) : (
    <ListItemIcon>
      <CheckIcon />
    </ListItemIcon>
    )
  
  // Display the delete icon only if we have a count (meaning we are
  // in a Docuss iframe) and the count is 0
  let deleteIcon = ''
  if (dcsCount !== undefined && dcsCount === 0) {
    deleteIcon = (
      <ListItemSecondaryAction className={classes.listItemSecondaryAction}>
        <IconButton
          aria-label="Delete"
          onClick={() => Websites.delete.call({ _id: website._id })}
          className={classes.iconButton}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    )
  }

  return (
    <ListItem selected={selected} className={classes.listItem}>
      {icon}
      <Badge color="primary" badgeContent={dcsCount} invisible={!dcsCount}>
        <Link href={path}>
          <ListItemText
            primary={website.url}
            classes={{ primary: props.classes.text }}
          />
        </Link>
      </Badge>
      {deleteIcon}
    </ListItem>
  )
})

//------------------------------------------------------------------------------

// On wide screen, when opening a website, we open it with the website on the
// left and the discussions on the right. On small screen,  when opening a
// website, we open it with the website full screen (and the split bar on the
// right)
const wideScreen = window.innerWidth >= 1035
const layout = wideScreen ? 3 : 2
const params = `?dcs-layout=${layout}&dcs-interact-mode=DISCUSS`

export default class UrlList extends React.Component {
  static propTypes = {
    websites: PropTypes.array.isRequired
  }

  render() {
    const { websites } = this.props

    const list = websites.map((website, index) => {
      const pathname = `/website/${website._id}`
      const path = pathname + params
      const LineWithCounts = withDcs(Line, pathname)
      const selected =
        index === 0 && new Date() - new Date(website.createdAt) < 1000
      return (
        <LineWithCounts
          key={website._id}
          path={path}
          website={website}
          selected={selected}
        />
      )
    })

    return <List component="nav">{list}</List>
  }
}

//------------------------------------------------------------------------------
