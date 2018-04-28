<?php
$map = array();
$terrain = array ('plains', 'forest', 'swamp', 'hills', 'mountain', 'water');
for ($row = 0; $row < 20; $row++) {
    $map[] = array();
    for ($column = 0; $column < 20; $column++) {
        $pool = $terrain;
        if (isset($map[$row-1])) {
            if (isset($map[$row-1][$column-1])) {
                $pool[] = $map[$row-1][$column-1];
                $pool[] = $map[$row-1][$column-1];
            }
            $pool[] = $map[$row-1][$column];
            $pool[] = $map[$row-1][$column];
            if (isset($map[$row-1][$column+1])) {
                $pool[] = $map[$row-1][$column+1];
                  $pool[] = $map[$row-1][$column+1];
            }
        }
        if (isset($map[$row][$column-1])) {
                $pool[] = $map[$row][$column-1];
                $pool[] = $map[$row][$column-1];
        }
        shuffle($pool);
        $map[$row][$column] = $pool[0];
    }
}
?>
