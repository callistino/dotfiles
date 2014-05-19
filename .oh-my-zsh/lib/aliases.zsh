# Push and pop directories on directory stack
alias pu='pushd'
alias po='popd'

# Basic directory operations
alias ...='cd ../..'
alias -- -='cd -'

# Super user
#alias ='sudo '
#alias _='sudo '
#alias please='sudo '

#alias g='grep -in'

# Show history
alias history='fc -l 1'

# List direcory contents
alias lsa='ls -lah'
alias l='ls -la'
alias ll='ls -l'
alias la='ls -lA'
alias sl=ls # often screw this up

alias afind='ack-grep -il'

# Codeception
alias codeception='vendor/bin/codecept'

# Symfony console
alias sf='php app/console'

# Tree command
alias tree='tree --dirsfirst -C -L 4 -I "vendor|node_modules|bower_components"'

# Vim from MacVim
alias vim='/Applications/MacVim.app/Contents/MacOS/Vim'
