#!/usr/bin/env python
from ants import *

# define a class with a do_turn method
# the Ants.run method will parse and update bot input
# it will also run the do_turn method for us
class MyBot:
    def __init__(self):
        # define class level variables, will be remembered between turns
        pass
    
    # do_setup is run once at the start of the game
    # after the bot has received the game settings
    # the ants class is created and setup by the Ants.run method
    def do_setup(self, ants):
        # initialize data structures after learning the game settings
        self.orders = {}
        pass
    
    # do turn is run once per turn
    # the ants class has the game state and is updated by the Ants.run method
    # it also has several helper methods to use
    def do_turn(self, ants):
        # tests if ant is in defense pos.
        def in_def():
            try:
                main_hill = ants.my_hills()[0]
                w = ants.destination(main_hill, 'w')
                nw = ants.destination(w, 'n')
                sw = ants.destination(w, 's')
            
                e = ants.destination(main_hill, 'e')
                ne = ants.destination(e, 'n')
                se = ants.destination(e, 's')
                return [nw, sw, ne, se]
            except:
                return []

        # track all moves, prevent collisions
        def do_move_direction(loc, direction):
            new_loc = ants.destination(loc, direction)
            
            if (ants.unoccupied(new_loc) and\
                new_loc not in self.orders and\
                loc not in self.orders.values()):
                ants.issue_order((loc, direction))
                self.orders[new_loc] = loc
                return True
            else:
                return False

        ant_list = ants.my_ants()
        ants.diffuse_board()
##        ants.diffuse_board()
##        ants.diffuse_board()
        # defence formation
        if len(ant_list) > 9:
            for loc in in_def():
                try:
                    ant_list.remove(loc)
                except:
                    pass
                
        # loop through all my ants and try to give them orders
        # the ant_loc is an ant location tuple in (row, col) form
        self.orders = {}
        #ufile = open('heatmap.txt', 'w')
        #for line in ants.gradient:
        #    ufile.write(str(line) + '\n')
        #ufile.close()
        for ant_loc in ant_list:
##            scents = ants.get_scent(ant_loc)
##            if scents[0] != 0:
##                goal = FOOD
##            else:
##                goal = EXPLORE
##
##            direction = ants.output_move(ant_loc, goal)
            direction = ants.get_direction(ant_loc)
            do_move_direction(ant_loc, direction)
            if ants.time_remaining() < 50:
                return
            
if __name__ == '__main__':
    # psyco will speed up python a little, but is not needed
    try:
        import psyco
        psyco.full()
    except ImportError:
        pass
    
    try:
        # if run is passed a class with a do_turn method, it will do the work
        # this is not needed, in which case you will need to write your own
        # parsing function and your own game state class
        Ants.run(MyBot())
    except KeyboardInterrupt:
        print('ctrl-c, leaving ...')
